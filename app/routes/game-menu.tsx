import * as React from 'react';
import { getRandomInt } from '~/utils';

function Button({ children }: { children: React.ReactNode }) {
	return (
		<button className="relative mt-6 block rounded-bl-3xl rounded-br-md rounded-tl-md rounded-tr-3xl border-4 border-cyan-400 bg-blue-200 bg-opacity-20 px-24 py-8 font-cyberwayRider text-6xl text-white first:mt-0">
			{children}
		</button>
	);
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
			<p className="container mx-auto">
				Inpired by this{' '}
				<a
					target="_blank"
					rel="noreferrer"
					className="font-bold text-blue-500 underline"
					href="https://web.dev/patterns/components/game-menu/demo.html"
				>
					Game Menu GUI Challenge
				</a>
			</p>

			<div className="mt-6 flex h-screen bg-gradient-to-b from-violet-900 to-violet-600">
				<div ref={menuRef} className="m-auto">
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
