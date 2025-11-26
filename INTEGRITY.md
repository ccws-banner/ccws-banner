# Integrity & Verification

This repository includes published artifacts served from the repo root for GitHub Pages. `/docs/index.html` references the root files via `../`. Use the checksums below to verify file integrity after downloading or when mirroring to another host.

## When to update
- After any change to published artifacts (`ccws-banner.js`, `ccws-banner.config.js`, `ccws-banner.config.schema.json`), regenerate checksums and update this file.
- Recommended at each tagged release.

## How to verify (example)
```bash
shasum -a 256 ccws-banner.js
```
Compare the output to the values below.

## Current SHA-256 checksums

- `ccws-banner.js`  
  `263dd9d7ca2f4e7793975b435977c676ef8632ded99ab99461609997191be0e0`

- `ccws-banner.config.js`  
  `bf0613af79479b0376638110b3e4ca6c9b4b45ed5570debbe21a6447921b1e62`

- `ccws-banner.config.schema.json`  
  `d617b90debe38a82734ecded21c0697c3db6eb9a4288d06377cc233e1dfeb4d3`
