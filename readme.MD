# Remix + Kinde error demo on Cloudflare workers

## Guide

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
