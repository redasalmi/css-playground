import {
  NavLink,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';

import { links as navLinks } from '~/constants';
import globalStyles from '~/styles/global.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'CSS Playground',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: globalStyles,
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="navbar">
          <ul className="container">
            {navLinks.map(({ link, title }) => (
              <li key={link}>
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    isActive ? 'active-link' : undefined
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="container">
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
