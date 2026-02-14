# Unicorn Birthday Party
#### A whimsical game about a Unicorn

# Setup
Navigate into your workspace directory.

### 1. Clone the repo:

```git clone https://github.com/danitpeck/unicorn-birthday-party.git```

### 2. Install the dependencies

```npm install```

### 3. Run the development server:

```npm start```

This will run a server so you can run the game in a browser.

Open your browser and enter localhost:3000 into the address bar.

Also this will start a watch process, so you can change the source and the process will recompile and refresh the browser

### Build for deployment:

```npm run build```

This will optimize and minimize the compiled bundle.

### Credits
Big thanks to this great repos:

https://github.com/lean/phaser-es6-webpack

https://github.com/belohlavek/phaser-es6-boilerplate

https://github.com/cstuncsik/phaser-es6-demo

---

## 2026 Modernization & Security Update

**Upgrade Date:** February 2026

**What changed:**
- Upgraded to Node.js 18+/20+ and npm 9+
- Migrated build system to Webpack 5 and Babel 7
- Updated ESLint to v9 and all lint plugins to latest compatible versions
- Removed legacy BrowserSync integration (use `webpack-dev-server` for local dev)
- All known npm vulnerabilities fixed (as of Feb 2026)
- Modernized all configs for compatibility with current toolchains

**How to build and run:**
- Install dependencies: `npm install`
- Start dev server: `npm start` (open http://localhost:3000)
- Build for production: `npm run build`

**Known issues:**
- Some dev dependencies may still show deprecation warnings (safe to ignore for local dev)
- If you upgrade Node/npm further, re-run `npm audit fix` and test

**Maintainers:**
- For future upgrades, see the comments in `webpack.config.js` and `.babelrc` for migration notes.

---

## Assets & Attribution

This project uses assets created by talented artists in the community. For full attribution details, including licenses and credits, please see [ATTRIBUTION.md](./ATTRIBUTION.md).

**Special thanks to:**
- **Sparrow666** - Unicorn sprite (modified version)
- **bluecarrot16** - Original LPC Horses artwork
- The OpenGameArt.org community for amazing free game assets!

---
