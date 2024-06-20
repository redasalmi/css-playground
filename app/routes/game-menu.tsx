import * as React from 'react';
import type { LinksFunction } from '@remix-run/node';
import { getRandomInt } from '~/utils';
import cyberwayRiders from '~/assets/font/cyberway-riders/cyberway-riders.otf?url';
import styles from '~/assets/css/game-menu.css?url';

export const links: LinksFunction = () => {
	return [
		{
			rel: 'preload',
			href: cyberwayRiders,
			as: 'font',
			crossOrigin: 'anonymous',
		},
		{
			rel: 'stylesheet',
			href: styles,
		},
	];
};

function Button({ children }: { children: React.ReactNode }) {
	return <button className="button">{children}</button>;
}

function randomRotation() {
	return {
		x: -getRandomInt(0, 1),
		y: getRandomInt(0, 1),
		angle: getRandomInt(20, 25),
	};
}

function rotate(x: number, y: number, angle: number) {
	return {
		transform: `perspective(800px) rotate3d(${x}, ${y}, 0, ${angle}deg)`,
	};
}

export default function GameMenuRoute() {
	const menuRef = React.useRef<HTMLDivElement>(null!);
	const oldRotation = React.useRef(randomRotation());
	const newRotation = React.useRef(randomRotation());

	const setAnimationValues = (initialPosition = false) => {
		const { x: oldX, y: oldY, angle: oldAngle } = oldRotation.current;
		const { x: newX, y: newY, angle: newAngle } = newRotation.current;

		const animation: Keyframe[] = [
			rotate(oldX, -oldY, oldAngle),
			rotate(newX, newY, newAngle),
			rotate(newX, -newY, newAngle),
		];

		if (initialPosition) {
			animation.unshift(rotate(0, 0, 0));
		}

		const timing: KeyframeAnimationOptions = {
			duration: 3000,
			fill: 'forwards',
		};

		menuRef.current.animate(animation, timing);
		oldRotation.current = newRotation.current;
		newRotation.current = randomRotation();
	};

	React.useEffect(() => {
		setAnimationValues(true);
		const interval = setInterval(() => {
			setAnimationValues();
		}, 3000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div>
			<p className="container">
				Inpired by this{' '}
				<a
					target="_blank"
					rel="noreferrer"
					className="link"
					href="https://web.dev/patterns/components/game-menu/demo.html"
				>
					Game Menu GUI Challenge
				</a>
			</p>

			<div className="menu">
				<div ref={menuRef} className="menu-content">
					<Button>New Game</Button>
					<Button>Continue</Button>
					<Button>Online</Button>
					<Button>Settings</Button>
					<Button>Quit</Button>
				</div>
			</div>
		</div>
	);
}
