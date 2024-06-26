import {
	NavLink,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import CheckMark from '~/assets/icons/check-mark.svg';

import { links as navLinks } from '~/constants';
import stylesReset from 'modern-normalize/modern-normalize.css?url';
import styles from '~/assets/css/global.css?url';

export const meta: MetaFunction = () => {
	return [
		{
			title: 'CSS Playground',
		},
		{
			name: 'description',
			content: 'CSS Playground',
		},
	];
};

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: stylesReset,
		},
		{
			rel: 'stylesheet',
			href: styles,
		},
	];
};

type LayoutProps = {
	children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<nav className="container navbar">
					<ul className="grid auto-rows-[minmax(40px,_auto)] grid-cols-3 navbar-links">
						{navLinks.map(({ link, title, done }) => (
							<li key={link}>
								<NavLink
									to={link}
									className={({ isActive }) =>
										`navbar-link ${isActive ? 'navbar-active-link' : ''}`.trim()
									}
								>
									<span>{title}</span>
									{done ? (
										<img src={CheckMark} alt="check mark" className="w-5" />
									) : null}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
				<main>{children}</main>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
