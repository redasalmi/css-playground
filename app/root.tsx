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
import tailwind from '~/tailwind.css?url';
import styles from '~/assets/css/global.css?url';

export const meta: MetaFunction = () => {
	return [
		{
			charset: 'utf-8',
			title: 'CSS Playground',
			viewport: 'width=device-width,initial-scale=1',
		},
	];
};

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: tailwind,
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
				<Meta />
				<Links />
			</head>
			<body className="grid min-h-screen grid-rows-[min-content,_1fr]">
				<nav className="container m-auto py-4">
					<ul className="grid auto-rows-[minmax(40px,_auto)] grid-cols-3">
						{navLinks.map(({ link, title, done }) => (
							<li key={link}>
								<NavLink
									to={link}
									className={({ isActive }) =>
										`flex gap-1 ${isActive ? 'font-bold text-blue-500 underline' : ''}`.trim()
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
