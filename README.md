https://driffft.com


## Getting started

This is a Hugo site that powers exaQuark.com. You can start a dev server by running

`hugo server`

on windows WSL, after `npm install`, run `execstack -c node_modules/sharp/vendor/lib/librsvg-2.so.2`


# Images

Put jpegs and pngs in the `/images` folder and run `npm run images`. If you don't need them to be optimised then put them directly in `/static/images/raw`.

Put svgs directly into `/static/images/svg`


To add an image to a post, use this format:

![Alt text](/images/{size}/name-of-image.png)
<figcaption>Caption</figcaption>

sizes available are: 100, 300, 800, 1000, rect, square.

eg:


![Minecraft CPU Usage](/images/1000/minecraft-cpu-usage.png)
<figcaption>Figure 3: an 8-core CPU server can handle around 1300 connected players.</figcaption>


# JS and CSS

Lives in `/src`. You should open another terminal and run `npm start`



### Development

- Use `hugo server` to start a Development server
- User `hugo new post/name-of-article.md` to create a new blog post
- Do `npm run images` after adding a image in `images/`

### Deployment

- Just push to master. Deployed via netlify
