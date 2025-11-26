const CONFIG_GLOBAL_KEY = "CCWSBannerConfig";
let configPromise;

const defaultConfig = {
  apiUrl: "https://ccws.cpozarks.org/wp-json/cpo-shelter/v1/shelters",
  siteUrl: "https://ccws.cpozarks.org",
  seasonStart: { month: 11, day: 1 },
  seasonEnd: { month: 4, day: 1 },
  text: {
    open: "🌙 Crisis Cold Weather Shelters are OPEN tonight",
    closed: "🌙 Crisis Cold Weather Shelters are CLOSED tonight"
  },
  colors: {
    open: "#16a34a",
    closed: "#c23b3b"
  },
  banner: {
    zIndex: 9999,
    fontFamily: "system-ui, sans-serif",
    padding: "0.75rem 1rem"
  },
  modal: {
    iframeHeight: 600,
    backdrop: "rgba(0,0,0,0.6)"
  },
  timing: {
    slideDelayMs: 50,
    iframeFallbackMs: 2000
  },
  fetchOptions: {
    cache: "no-store"
  }
};

const getScriptBase = () => {
  const current =
    document.currentScript ||
    Array.from(document.getElementsByTagName("script")).find((s) =>
      (s.src || "").includes("ccws-banner.js")
    );
  if (!current || !current.src) return document.baseURI;
  const parts = current.src.split("/");
  parts.pop();
  return `${parts.join("/")}/`;
};

const mergeConfig = (base, overrides = {}) => ({
  ...base,
  ...overrides,
  seasonStart: { ...base.seasonStart, ...(overrides.seasonStart || {}) },
  seasonEnd: { ...base.seasonEnd, ...(overrides.seasonEnd || {}) },
  text: { ...base.text, ...(overrides.text || {}) },
  colors: { ...base.colors, ...(overrides.colors || {}) },
  banner: { ...base.banner, ...(overrides.banner || {}) },
  modal: { ...base.modal, ...(overrides.modal || {}) },
  timing: { ...base.timing, ...(overrides.timing || {}) },
  fetchOptions: { ...base.fetchOptions, ...(overrides.fetchOptions || {}) }
});

const loadConfigScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

const loadConfig = async () => {
  if (globalThis[CONFIG_GLOBAL_KEY]) {
    return mergeConfig(defaultConfig, globalThis[CONFIG_GLOBAL_KEY]);
  }

  // Candidate host locations (common static-config spots).
  const candidates = [
    new URL("ccws-banner.config.js", document.baseURI).href,
    new URL("/config/ccws-banner.config.js", document.baseURI).href,
    new URL("/assets/config/ccws-banner.config.js", document.baseURI).href
  ];

  for (const url of candidates) {
    const loaded = await loadConfigScript(url);
    if (loaded && globalThis[CONFIG_GLOBAL_KEY]) {
      return mergeConfig(defaultConfig, globalThis[CONFIG_GLOBAL_KEY]);
    }
  }

  // Fallback to the repo-served default config (relative to this script).
  const fallbackUrl = new URL("ccws-banner.config.js", getScriptBase()).href;
  const defaultLoaded = await loadConfigScript(fallbackUrl);
  if (defaultLoaded && globalThis[CONFIG_GLOBAL_KEY]) {
    return mergeConfig(defaultConfig, globalThis[CONFIG_GLOBAL_KEY]);
  }

  // Last-resort inlined defaults to avoid hard failure.
  return defaultConfig;
};

const getConfig = () => {
  if (!configPromise) {
    configPromise = loadConfig();
  }
  return configPromise;
};

const getSeasonWindow = (today, config) => {
  const currentMonth = today.getMonth() + 1;
  const { seasonStart, seasonEnd } = config;
  const crossesYear = seasonEnd.month <= seasonStart.month;
  let startYear = today.getFullYear();

  if (currentMonth < seasonStart.month) {
    startYear -= 1;
  }

  if (!crossesYear && currentMonth >= seasonStart.month && currentMonth < seasonEnd.month) {
    startYear = today.getFullYear();
  }

  const start = new Date(startYear, seasonStart.month - 1, seasonStart.day);
  const endYear = crossesYear ? startYear + 1 : startYear;
  const end = new Date(endYear, seasonEnd.month - 1, seasonEnd.day);

  return { start, end };
};

class CCWSBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.configPromise = getConfig();
  }

  async connectedCallback() {
    this.config = await this.configPromise;
    const today = new Date();
    const { start, end } = getSeasonWindow(today, this.config);

    if (today < start || today >= end) {
      this.remove();
      return;
    }

    this.render();

    const banner = this.shadowRoot.getElementById("banner");
    const modal = this.shadowRoot.getElementById("modal");
    const closeBtn = this.shadowRoot.getElementById("closeBtn");
    const frame = this.shadowRoot.getElementById("frame");

    banner.addEventListener("click", () => {
        const { siteUrl, timing } = this.config;
        const fallbackMs = timing.iframeFallbackMs || 2000;
        let settled = false;

        const cleanup = () => {
          frame.onload = null;
          frame.onerror = null;
        };

        const openNewTab = () => {
          if (settled) return;
          settled = true;
          cleanup();
          modal.classList.remove("visible");
          frame.src = "";
          window.open(siteUrl, "_blank", "noopener");
        };

        frame.onload = () => {
          if (settled) return;
          settled = true;
          cleanup();
        };

        frame.onerror = openNewTab;

        modal.classList.add("visible");
        frame.src = siteUrl;
        setTimeout(openNewTab, fallbackMs);
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("visible");
      frame.src = "";
    });

    try {
      const response = await fetch(this.config.apiUrl, this.config.fetchOptions);
      const shelters = await response.json();
      const isOpen = Array.isArray(shelters) && shelters.length > 0;
      const color = isOpen ? this.config.colors.open : this.config.colors.closed;
      const message = isOpen ? this.config.text.open : this.config.text.closed;

      banner.textContent = message;
      banner.style.backgroundColor = color;
      banner.classList.add("visible");

      setTimeout(() => banner.classList.remove("hidden-start"), this.config.timing.slideDelayMs);
    } catch (err) {
      console.warn("CCWS status check failed:", err);
      this.remove();
    }
  }

  render() {
    const { banner, modal } = this.config;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: ${banner.zIndex};
          font-family: ${banner.fontFamily};
        }
        .banner {
          display: none;
          text-align: center;
          color: #fff;
          cursor: pointer;
          padding: ${banner.padding};
          font-weight: 600;
          transition: transform 0.4s ease, background 0.4s ease;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .banner.visible {
          display: block;
          transform: translateY(0);
        }
        .banner.hidden-start {
          transform: translateY(-100%);
        }
        .modal {
          position: fixed; inset: 0;
          background: ${modal.backdrop};
          display: none;
          align-items: center; justify-content: center;
          z-index: ${banner.zIndex + 1};
        }
        .modal.visible { display: flex; }
        .modal-content {
          background: #fff;
          border-radius: 0.5rem;
          width: 90%; max-width: 900px;
          position: relative;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }
        button.close {
          position: absolute; top: 0.5rem; right: 0.75rem;
          border: none; background: none;
          font-size: 1.5rem; cursor: pointer; color: #333;
        }
        iframe {
          width: 100%; height: ${modal.iframeHeight}px; border: none;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      </style>

      <div class="banner hidden-start" id="banner"></div>
      <div class="modal" id="modal">
        <div class="modal-content">
          <button class="close" id="closeBtn" aria-label="Close">&times;</button>
          <iframe id="frame" loading="lazy"></iframe>
        </div>
      </div>
    `;
  }
}

customElements.define("ccws-banner", CCWSBanner);
