---
description: Simple bomberman-like dungeon crawler made in Phaser 3 webpack template
---

# Dungeonman

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

This project already contains the assets, they are free to use by the author [0x72](https://0x72.itch.io/dungeontileset-ii)

## Available Commands

| Command | Description |
| :--- | :--- |
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings \(minification, uglification, etc..\) |

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server \(available at `http://localhost:8080` by default\).

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location \(say something like `http://mycoolserver.com`\), you should be able to open `http://mycoolserver.com/index.html` and play your game.

