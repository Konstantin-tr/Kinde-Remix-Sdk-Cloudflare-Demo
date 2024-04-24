# Remix + Kinde demo on Cloudflare workers

This repository presents a broken demo of using Remix + Kinde on Cloudflare (based on remix sdk).
Additionally, a working demo using a fork of the remix sdk is available to showcase how Remix + Kinde can work on Cloudflare.
Both demos assume that you have a kinde account + business setup with correct allowed URLS (callback/logout => port 5173 on localhost for remix dev server).

## Guide - Error demo (@kinde-oss/kinde-remix-sdk package)

This is a guide for starting the error demo project (remix-kinde-error-demo).

### Setup

The following steps are necessary to setup the demo.

1. Install packages with `npm i`
2. Add kinde ENV vars to `.dev.vars` (secrets) or `wrangler.toml` (regular variables) file
3. (Optional) Use `npm run typegen` to update cloudflare worker binding with ENV var typings

### Dev Mode

The following steps show the behavior in development mode.

1. Start app locally with `npm run dev`
2. View Index page
3. Click Login or Register

Result:
You will receive an error (URL undefined).
The reason for this is that Kinde reads process.env but Cloudflare Workers do not use process.env.
Instead Cloudflare Workers use a context object containing the environment variables.
See /app/routes/\_index.tsx for usage.

### Preview Mode

The following steps show the behavior in preview mode (compiled and running on local CF worker runtime).

1. Start preview mode with `npm run preview`

Result:
The remix-site will build but the CF worker will not compile.
The crypto and steam package will not be found because CF workers by default do not use NODE.js as the runtime (There is a workaround but it requires extra configuration).
Because NODE.js is not supported by default, the package "remix/node" causes issues.
Instead "remix/cloudflare" can be used to avoid these compile errors.

## Guide - Working demo (custom package: kinde-remix-cloudflare-sdk)

This is a guide for starting the working demo project using the custom sdk package (remix-kinde-demo-custom-package).

### Setup

The following steps are necessary to setup the demo.

1. Install packages with `npm i`
2. Add kinde ENV vars to `.dev.vars` (secrets) or `wrangler.toml` (regular variables) file
3. (Optional) Use `npm run typegen` to update cloudflare worker binding with ENV var typings

### Dev Mode

The following steps show the behavior in development mode.

1. Start app locally with `npm run dev`
2. View Index page
3. Click Login or Register

Result:
You will be able to register/login correctly.
After authentication, you can see the ID of your user and the option to logout.

### Preview Mode

The following steps show the behavior in preview mode (compiled and running on local CF worker runtime).

1. Start preview mode with `npm run preview`

Result:
The remix-site will build but the CF worker will not compile.
The crypto and steam package will not be found because CF workers by default do not use NODE.js as the runtime (There is a workaround but it requires extra configuration).
Because NODE.js is not supported by default, the package "remix/node" causes issues.
Instead "remix/cloudflare" can be used to avoid these compile errors.
