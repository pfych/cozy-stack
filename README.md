# Cozy Stack

> A Gift for my friends

Cozy stack is a CLI tool that converts a folder of HTML, Markdown, SCSS & Typescript into a small bundle of plain HTML, CSS & JS.

This bundle can then be deployed anywhere that serves HTML.

## Getting started

```sh
npx cozy-stack -i ~/my-site -o /tmp/my-build # Build to a folder
```

### Markdown format

Markdown must contain a metadata header:

```markdown
---
template: main.html
stylesheets: test.scss
scripts: test.ts
title: My first post
---

# Example

Hello World
```

In this example, the `main.html` template will be used, `test.scss` will be imported and `test.ts` will also be imported. Only `template:` is mandatory.


### Folder structure

Your site must at the bare minimum have the following structure:

```
src/
├ content/
│ └ index.md
├ scripts/
├ styles/
└ templates/
  └ main-template.html
```

#### Content folder

All items in the content folder will be parsed and placed at the root of the build directory, subdirectories will be kept intact.

#### Scripts folder

All Typescript here will be bundled into separate `.min.js` bundles 

#### Styles folder

All SCSS here will be bundled into a `style.css` bundle

#### Templates folder

These templates are referenced by markdown files in content. The markdown content will be inserted at `{body}` inside this template. Scripts, stylesheets, title etc. will be inserted at  `{head}`.

