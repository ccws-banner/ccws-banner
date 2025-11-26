# Contributing to CCWS Banner

Thank you for your interest in improving the **CCWS Banner** project!  
This tool helps community organizations share Crisis Cold Weather Shelter
status quickly and reliably. We welcome all types of contributions —
ideas, documentation, code, testing, and feedback.

Please read these guidelines before contributing.

---

## 📬 Questions, Support & Issue Reporting

If you have a question or find a problem:

1. Visit the **Issues** tab  
2. Click **New Issue**  
3. Choose the issue type  
4. Include:
   - What happened  
   - What you expected  
   - Steps to reproduce  
   - Browser/environment details  
   - Any custom configuration you are using  

Clear reports make it easier for everyone to help.

---

## 💡 Suggesting Improvements

Feature suggestions are welcome — especially those that help:

- Nonprofits and community partners
- Accessibility
- Safety and clarity of information
- Customization options
- Reliability and fallback behavior
- Documentation and onboarding

Before submitting:
- Review existing issues to avoid duplicates  
- Open a new **enhancement** issue if your idea is new  
- Briefly explain the use case and benefit to users  

---

## 🔧 Submitting Code Changes (Pull Requests)

We appreciate thoughtful, well-documented contributions.  
To submit a PR:

### 1. Fork the repository
Click **Fork** at the top of the GitHub page.

### 2. Create a branch for your changes
Use descriptive names such as:
```
fix/modal-fallback
feature/custom-colors
docs/update-readme
```

### 3. Make your changes
Please follow these project principles:

- Keep the library **zero-dependency**
- Maintain compatibility with simple, static websites
- Do not introduce build steps, bundlers, or frameworks
- Keep file sizes small and logic clear
- Ensure the banner continues to work with:
  - **No config file**
  - **A site-specific config file**
  - **The repo fallback config**
  - **Only embedded defaults**
- Do not introduce breaking changes without discussion
- Do not modify the external data source URLs without discussion

### 4. Update or add documentation
If your change affects behavior, configuration, or usage, please update:

- README.md  
- Example config file (if needed)  

### 5. Test your changes
At minimum, confirm these:

- Banner loads normally on a basic HTML page  
- Banner loads with a site-specific `ccws-banner.config.js`  
- Fallback to repo-provided config works  
- Embedded default configuration still functions  
- Seasonal logic works correctly  
- Iframe fallback opens a new tab when needed  
- No console errors  

### 6. Submit a Pull Request
Include in your PR description:

- What you changed  
- Why you changed it  
- How you tested it  
- Whether documentation was updated  

A maintainer will review and may request adjustments.

---

## 📁 Project Structure (Quick Reference)

```
/
├── LICENSE                     # Apache 2.0 license
├── NOTICE                      # Attribution + external site disclaimers
├── README.md                   # Implementation documentation
├── CONTRIBUTING.md             # Contributing documentation
├── ccws-banner.js              # Main web component (canonical copy)
├── ccws-banner.config.js       # Repo-provided default config (fallback layer #2)
├── ccws-banner.config.schema.json # JSON Schema for config validation
└── docs/                       # GitHub Pages demo; index.html references root files
```

Key priorities:

- Zero dependencies  
- Nonprofit-friendly adoption  
- Safe interaction with external data  
- Minimal configuration required  
- Resilient fallback behavior  
- Clear, accessible documentation  

---

## 🔐 External Data Policy 

This project reads **publicly accessible JSON** from:

```
https://ccws.cpozarks.org
```

This is used only to determine whether shelters are OPEN or CLOSED.

### Contributors **may not**:
- Copy, store, or include **any** third-party data files in this repository  
  (e.g., JSON data dumps, snapshots, scraped content)
- Hardcode or redistribute external data inside project files  

### Contributors **may**:
- Use the external data **at runtime** exactly as the banner does  
- Add configuration options that interact with the external URL  
- Improve error handling, fallback behavior, and accessibility  

This policy ensures the project respects the rights of external data owners
while remaining fully functional for implementers.

---

## 📄 Licensing of Contributions

By submitting a contribution:

- You agree that your contribution is licensed under the **Apache License 2.0**  
- You confirm that you have the legal right to submit the contribution  
- You understand that all contributions become part of this open-source project  

This ensures the project remains freely available for nonprofits and community
partners.

---

## ❤️ Thank You

Your contributions help people access critical shelter information when it matters most.  
Whether you're fixing a bug, improving the documentation, or simply reporting an issue —
**thank you** for supporting this community-focused project.

If you'd like to discuss an idea or want guidance, feel free to open an Issue
or start a Discussion on GitHub.
