# Phaser Editor 2D Vite.js Template

A template that can be opened in Phaser Editor 2D.

## First steps

This project requires [Node.js](https://nodejs.org) and [NPM.js](https://www.npmjs.com). It is recommended that you learn the basics of [ViteJS](https://vitejs.dev).

* Install dependencies:

    ```
    npm install
    ```

* Run the development server:

    ```
    npm run dev
    ```

    Open the browser at `http://localhost:3000`.

* Make a production build:

    ```
    npm run build
    ```

    It is generated in the `/dist` folder.

## Run the editor

* You can run the editor using the `editor` NPM script, defined in the `package.json` file:

    ```bash
    $ npm install
    $ npm run editor
    ```

* If you are in a remote environment (like the Gitpod.io IDE), then run the editor like this:

    ```bash
    $ npm run editor-remote
    ```

* If you want to see all the editor options, run:

    ```bash
    $ npx phasereditor2d-launcher -help
    ```

* If Phaser Editor 2D Core is globally installed, you can run:

    ```bash
    $ PhaserEditor2D -project .
    ```

## Phaser Editor 2D considerations

### Excluding files from the project

There are a lot of files present in the project that are not relevant to Phaser Editor 2D. For example, the whole `node_modules` folder should be excluded from the editor's project.

The `/.skip` file lists the folders and files to exclude from the editor's project. 

[Learn more about resource filtering in Phaser Editor 2D](https://help.phasereditor2d.com/v3/misc/resources-filtering.html)

### Setting the root folder for the game's assets

The `/static` folder contains the assets (images, audio, atlases) used by the game. ViteJS copies it to the distribution folder and makes it available as a root path. For example, `http://localhost:3000/assets` points to the `/static/assets` folder.

By default, Phaser Editor 2D uses the project's root as the start path for the assets. You can change it by creating an empty `publicroot` file. That is the case of the `/static/publicroot` file, which allows adding files to the Asset Pack file (`/static/assets/asset-pack.json`) using correct URLs.

### Asset Pack content hash

The NPM `build` script calls the `phaser-asset-pack-hashing` tool. It parses all pack files in the `dist/` folder and transform the internal URL, adding the content-hash to the query string. It also parses files referenced by the pack. For example, a multi-atlas file is parsed and the name of the image's file will be changed to use a content-hash.

Learn more about the [phaser-asset-pack-hashing](https://www.npmjs.com/package/phaser-asset-pack-hashing) tool.

### Coding

The `/src` folder contains all the TypeScript code, including the scene and user component files, in addition to the Phaser Editor 2D compilers output.

We recommend using Visual Studio Code for editing the code files.

In many tutorials about Phaser Editor 2D, the JavaScript files are loaded using the Asset Pack editor. When using ViteJS this is not needed. Just use the Asset Pack editor for loading the art assets.

### Scene and User Components configuration

The Scenes and User Components are configured to compile to TypeScript ES modules. Also, the compilers auto-import the classes used in the generated code.