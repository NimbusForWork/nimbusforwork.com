# Nimbus

## Getting started

This is a Hugo site. You can start a dev server by running

`hugo server`

on windows WSL, after `npm install`, run `execstack -c node_modules/sharp/vendor/lib/librsvg-2.so.2`

### JS and CSS

Lives in `/src`. You should open another terminal and run `npm start`. This will build all the static assets for the site

### Vue app

There is a Vue app in `./src/app`. Running `npm run build` in this will build the app into `./static/app`, which is available on https://nimbusforwork.com/app

## Development

- Use `hugo server` to start a Development server
- To convert images to various sizes run `npm run images` after adding a image in `static/images/`

## Deployment

- Just push to master. Deployed via netlify
