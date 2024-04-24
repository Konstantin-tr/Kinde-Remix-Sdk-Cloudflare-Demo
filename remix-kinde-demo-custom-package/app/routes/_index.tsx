import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, json, useLoaderData } from "@remix-run/react";
import { getKindeSession } from "kinde-remix-cloudflare-sdk";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  // This object contains the actual environement VARS
  const env = context.cloudflare.env;

  const { getUser } = await getKindeSession(
    request,
    // Can be abstracted into a separate function to map env to config
    {
      clientId: env.KINDE_CLIENT_ID,
      clientSecret: env.KINDE_CLIENT_SECRET,
      issuerUrl: env.KINDE_ISSUER_URL,
      kindePostLoginRedirectUrl: env.KINDE_POST_LOGIN_REDIRECT_URL,
      kindePostLogoutRedirectUrl: env.KINDE_POST_LOGOUT_REDIRECT_URL,
      kindeSiteUrl: env.KINDE_SITE_URL,
    }
  );

  const user = await getUser();

  return json({
    url: env.KINDE_ISSUER_URL,
    isAuthenticated: !!user,
    userId: user?.id,
  });
}

export default function Index() {
  const { url, isAuthenticated, userId } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Kinde + Remix Working Demo on Cloudflare</h1>
      <h2>Kinde Issuer URL: {url}</h2>
      {isAuthenticated ? <h3>Current User ID: {userId}</h3> : <></>}
      <div>
        <span>This text is visible for everyone!</span>
      </div>
      {isAuthenticated ? (
        <div>
          <span>
            You are logged in! <Link to="/kinde-auth/logout">Logout</Link>
          </span>
        </div>
      ) : (
        <div>
          <span>
            You are not logged in, please login or register:{" "}
            <Link to="/kinde-auth/login">Login</Link> -{" "}
            <Link to="/kinde-auth/register">Register</Link>
          </span>
        </div>
      )}
    </div>
  );
}
