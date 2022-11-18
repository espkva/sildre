import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import rootStyles from "~/styles/index.css";
import jklButtonStyles from "@fremtind/jkl-button/button.min.css";
import jklCardStyles from "@fremtind/jkl-card/card.min.css";
import jklMessageBox from "@fremtind/jkl-message-box/message-box.min.css";

const styles = [rootStyles, jklButtonStyles, jklCardStyles, jklMessageBox];

export const links: LinksFunction = () => {
  return styles.map((href) => ({
    rel: "stylesheet",
    href,
  }));
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Team Sjiraff",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="jkl" data-theme="dark">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
