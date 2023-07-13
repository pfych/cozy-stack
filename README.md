# Cozy Stack

> A Gift for my friends

Cozy stack is a CLI tool that converts a folder of HTML, Markdown, SCSS & Typescript into a small bundle of plain HTML, CSS & JS.

This bundle can then be deployed anywhere that serves HTML.

## Getting started

```sh
npx cozy-stack -i ~/my-site -o /tmp/my-build # Build to a folder
npx cozy-stack -i ~/my-site --port 8080 --bind 127.0.0.1 # Serve locally
```

Your site must at the bare minimum have the following structure:

```
src/
├ content/
├ scripts/
├ styles/
├ templates/
└ index.html
```

### Content folder

All items in the content folder will be parsed and placed at the root of the build directory

### Scripts folder

All Typescript here will be bundled into separate `.min.js` bundles 

### Styles folder

All SCSS here will be bundled into a `style.css` bundle

### Templates folder

These templates are referenced by markdown files in content. The markdown content will be inserted at `{body}` inside this template.
