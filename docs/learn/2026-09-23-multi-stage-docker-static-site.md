---
title: Multi-stage Docker builds for a static site
date: 2026-09-23
project: webdev-resources-for-agentic-coding
tags: [docker, nginx, deployment, coolify, caching]
status: unread
---

# Multi-stage Docker builds for a static site

Think of a bakery that bakes in a big kitchen full of mixers, flour sacks and ovens, but only ships the finished loaves to the shop. The customer never sees the kitchen. A multi-stage Docker build works the same way: one stage holds all the heavy tools needed to produce the site, and a second, much smaller stage holds only the finished output.

## What we did in this project

This site is a React app built with Vite. Vite's job is to take the source files and produce a folder called dist, which contains a single HTML file, one CSS file and one JavaScript bundle. Once that folder exists, the site no longer needs Node, npm, React's source, or any of the several hundred megabytes of node_modules. It is just files a web server can hand out.

The Dockerfile at the root of the repo has two stages. The first starts from the official Node 22 image on Alpine Linux, copies in package.json and package-lock.json, runs npm ci, then copies the rest of the source and runs the Vite build. The package files are copied before the source on purpose: Docker caches each step, so as long as the dependency list hasn't changed, a rebuild after editing App.jsx skips the slow install step and goes straight to the build.

The second stage starts fresh from the nginx Alpine image, which is around fifty megabytes. It copies in our nginx.conf and then copies only the dist folder out of the first stage. Everything else from stage one is thrown away. The final image that Coolify runs contains nginx and about two hundred kilobytes of site, nothing more.

There is also a .dockerignore file, which works like .gitignore but for the build context. It stops your local node_modules, dist and .git folder from being sent to Docker at all. Without it, a local macOS node_modules could get copied over the freshly installed Linux one, and native packages such as the Rolldown bundler would break because they were compiled for the wrong operating system.

## The nginx configuration

The nginx.conf file does three things. It turns on gzip compression for text assets, which shrinks the JavaScript bundle from about 213 kilobytes to about 67 on the wire.

It sets caching rules in two tiers. Vite puts a content hash into every asset filename, so a file named something like index-XRB4 dot js will never change its contents; if the code changes, the filename changes. That means files under the assets path can be cached by browsers for a full year and marked immutable. The index.html file is the opposite: it has a fixed name and points at whichever hashed bundle is current, so it is served with no-cache, meaning the browser must check with the server every time. The result is that a new deploy is visible on the next page load, while returning visitors still skip re-downloading unchanged bundles.

Finally, any URL that doesn't match a real file falls back to index.html. The site doesn't use a client-side router today, but if one is added later, deep links like slash modules slash git will keep working instead of returning a 404.

## Why this choice, and the alternatives

The first alternative is to skip the second stage and just run npm run preview or a small Node static server in the Node image. It works, but the image is several hundred megabytes instead of around fifty, it ships your whole toolchain into production, and Vite's own documentation says its preview server is not meant for production traffic. nginx is built for exactly this job and handles thousands of concurrent requests on very little memory.

The second alternative is Coolify's Nixpacks or static build pack, which detects the project type and builds it for you with no Dockerfile. That is less to maintain, but the build is a black box: you can't easily control the Node version, the caching headers, or the fallback behaviour, and it's harder to reproduce locally. With a Dockerfile, running docker build on your laptop produces the same image Coolify will run, which is how this setup was tested.

The third alternative is a static host such as GitHub Pages, Netlify or Cloudflare Pages. The CNAME file in the repo suggests this site has lived on GitHub Pages before. Those hosts are free and put a global CDN (content delivery network) in front of the site, which a single Coolify server doesn't give you. You'd pick Coolify when you want everything on infrastructure you control, alongside other services on the same box.

## Failure modes to watch for

If the index.html ever gets a long cache lifetime, users can be stuck on an old version for days after a deploy, because their cached HTML keeps pointing at old bundle names. If the container's exposed port doesn't match what Coolify expects, Coolify's proxy returns a bad gateway error even though the container is healthy; this setup uses port 80, so the Ports Exposes field in Coolify should say 80. And if the Node version in stage one is too old, the Rolldown-based Vite build fails; Node 22 satisfies it.

## Glossary

Multi-stage build: a Dockerfile with more than one FROM line, where later stages copy selected files out of earlier ones.

Build context: the set of files sent to Docker when you run a build, filtered by .dockerignore.

Content hash: a short fingerprint of a file's contents, embedded in its filename so the name changes whenever the contents do.

Immutable caching: telling the browser a file will never change, so it doesn't even ask the server to revalidate it.

SPA fallback: serving index.html for unknown paths so a single-page application (SPA) can handle routing in the browser.
