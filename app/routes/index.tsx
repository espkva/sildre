import { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import styles from "../styles/landing.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function Index() {
  return (
    <Link to="start" className="jkl-button jkl-button--primary">
      Start
    </Link>
  );
}
