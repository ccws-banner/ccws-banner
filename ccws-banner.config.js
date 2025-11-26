/**
 * CCWS Banner Web Component
 * Copyright (c) 2025
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This project retrieves publicly accessible data from external sources.
 * All rights to external data and websites remain with their respective owners.
 * No affiliation or endorsement is implied.
 */


/**
 * CCWS Banner – Example Configuration File
 * ----------------------------------------
 *
 * This file provides default configuration settings for the CCWS Banner
 * component. Website owners can copy this file onto their own server and
 * modify any of the values to customize how the banner behaves.
 *
 * To use this file on your website:
 *
 * 1. Copy it to one of the following paths on YOUR web server:
 *
 *      /ccws-banner.config.js
 *      /config/ccws-banner.config.js
 *      /assets/config/ccws-banner.config.js
 *
 * 2. Modify any settings below to match your needs.
 *
 * 3. Make sure the file is served publicly (e.g., https://yoursite.com/ccws-banner.config.js)
 *
 * Any configuration defined in this file will override the built-in defaults
 * packaged with the ccws-banner.js script.
 *
 * No sensitive information should ever be placed in this file.
 */

window.CCWSBannerConfig = window.CCWSBannerConfig || {

  // ---------------------------------------------------------------------------
  // DATA SOURCE
  // ---------------------------------------------------------------------------
  // Public JSON endpoint providing shelter status.
  // The banner considers the system OPEN when this URL returns a JSON array
  // with one or more shelters.
  apiUrl: "https://ccws.cpozarks.org/wp-json/cpo-shelter/v1/shelters",

  // Webpage to show when the banner is clicked (shown in iframe when allowed).
  siteUrl: "https://ccws.cpozarks.org",

  // ---------------------------------------------------------------------------
  // DISPLAY SEASON (Month numbers are 1–12)
  // ---------------------------------------------------------------------------
  // The banner only appears between these dates each year.
  seasonStart: { month: 11, day: 1 }, // November 1 (start of current season)
  seasonEnd: { month: 4, day: 1 },    // April 1 (end of current season)

  // ---------------------------------------------------------------------------
  // BANNER TEXT
  // ---------------------------------------------------------------------------
  text: {
    open:  "🌙 Crisis Cold Weather Shelters are OPEN tonight",
    closed:"🌙 Crisis Cold Weather Shelters are CLOSED tonight"
  },

  // ---------------------------------------------------------------------------
  // COLORS AND STYLING
  // ---------------------------------------------------------------------------
  colors: {
    open:   "#16a34a", // Green
    closed: "#c23b3b"  // Red
  },

  banner: {
    zIndex:     9999,
    fontFamily: "system-ui, sans-serif",
    padding:    "0.75rem 1rem"
  },

  // ---------------------------------------------------------------------------
  // MODAL / IFRAME BEHAVIOR
  // ---------------------------------------------------------------------------
  modal: {
    iframeHeight: 600,
    backdrop:     "rgba(0,0,0,0.6)"
  },

  // ---------------------------------------------------------------------------
  // TIMING
  // ---------------------------------------------------------------------------
  timing: {
    slideDelayMs:     50,   // Delay before banner animates down
    iframeFallbackMs: 2000  // If iframe does not load, open new tab instead
  },

  // ---------------------------------------------------------------------------
  // NETWORK OPTIONS
  // ---------------------------------------------------------------------------
  fetchOptions: {
    cache: "no-store"
  }
};
