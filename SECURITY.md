# Security Policy

## Reporting a Vulnerability

If you discover a security issue or vulnerability, please report it responsibly:

- Email: john@jmurphy.dev
- Include a clear description, steps to reproduce, and any potential impact.
- Do not open a public issue for new vulnerabilities.

We will acknowledge receipt as quickly as possible, review the report, and provide updates on remediation progress. Please allow reasonable time for investigation and remediation before public disclosure.

## Scope

- `ccws-banner.js` and supporting assets in this repository.
- The GitHub Pages demo site (`/docs`).

## Preferred Information to Include

- Affected file(s) and code locations, if known.
- Reproduction steps or proof-of-concept.
- Expected vs. actual behavior.
- Environment details (browser, OS, versions).

## Security Principles

- Zero dependencies to minimize supply-chain risk.
- External data is fetched only from configured endpoints.
- Graceful failure: if config or fetch fails, the banner removes itself rather than breaking host pages.

## Coordinated Disclosure

Please give us time to remediate before public disclosure. We aim to respond quickly and will coordinate any public communications once a fix or mitigation is ready.*** End Patch​
