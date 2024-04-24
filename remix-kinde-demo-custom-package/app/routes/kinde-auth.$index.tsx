import { LoaderFunctionArgs } from "@remix-run/node";
import { handleAuth } from "kinde-remix-cloudflare-sdk";
export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const env = context.cloudflare.env;

  return await handleAuth(request, params.index, {
    clientId: env.KINDE_CLIENT_ID,
    clientSecret: env.KINDE_CLIENT_SECRET,
    issuerUrl: env.KINDE_ISSUER_URL,
    kindePostLoginRedirectUrl: env.KINDE_POST_LOGIN_REDIRECT_URL,
    kindePostLogoutRedirectUrl: env.KINDE_POST_LOGOUT_REDIRECT_URL,
    kindeSiteUrl: env.KINDE_SITE_URL,
  });
}
