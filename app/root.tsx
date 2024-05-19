import {
	NavLink,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';

import { links as navLinks } from '~/constants';
import styles from '~/tailwind.css?url';

export const meta: MetaFunction = () => [
	{
		charset: 'utf-8',
		title: 'CSS Playground',
		viewport: 'width=device-width,initial-scale=1',
	},
];

export const links: LinksFunction = () => [
	{
		rel: 'stylesheet',
		href: styles,
	},
];

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="grid min-h-screen grid-rows-[min-content,_1fr]">
				<nav className="container m-auto py-4">
					<ul className="grid auto-rows-[minmax(40px,_auto)] grid-cols-3">
						{navLinks.map(({ link, title }) => (
							<li key={link}>
								<NavLink
									to={link}
									className={({ isActive }) =>
										isActive ? 'font-bold text-blue-500 underline' : undefined
									}
								>
									{title}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				<main>
					<Outlet />
				</main>

				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
