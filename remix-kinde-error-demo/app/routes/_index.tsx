import { getKindeSession } from "@kinde-oss/kinde-remix-sdk";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, json, useLoaderData } from "@remix-run/react";

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
  const { getUser } = await getKindeSession(request);

  const user = await getUser();

  // This object contains the actual environement VARS
  const env = context.cloudflare.env;

  return json({ url: env.KINDE_ISSUER_URL, isAuthenticated: !!user });
}

export default function Index() {
  const { url, isAuthenticated } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Kinde + Remix Error Demo on Cloudflare</h1>
      <h2>Kinde Issuer URL: {url}</h2>
      <div>
        <span>This text is public.</span>
      </div>
      {isAuthenticated ? (
        <div>
          <span>This text is private.</span>
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
