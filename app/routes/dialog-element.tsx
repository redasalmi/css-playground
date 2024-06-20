import * as React from 'react';
import type { LinksFunction } from '@remix-run/node';
import { valueToCssUnit } from '~/utils';
import styles from '~/assets/css/dialog-element.css?url';

type Animation = {
	show: string;
	hide: string;
};

const animations: Record<string, Animation> = {
	fromTop: {
		show: 'slideInFromTop',
		hide: 'slideOutToTop',
	},
	fromBottom: {
		show: 'slideInFromBottom',
		hide: 'slideOutToBottom',
	},
	fromCenter: {
		show: 'appearFromCenter',
		hide: 'hideIntoCenter',
	},
	fromButton: {
		show: 'appearFromElement',
		hide: 'hideIntoElement',
	},
};

const animationsOptions = [
	{
		key: 'top-option',
		value: JSON.stringify(animations.fromTop),
		label: 'Show Dialog from Top',
	},
	{
		key: 'bottom-option',
		value: JSON.stringify(animations.fromBottom),
		label: 'Show Dialog from Bottom',
	},
	{
		key: 'center-option',
		value: JSON.stringify(animations.fromCenter),
		label: 'Show Dialog from Center',
	},
	{
		key: 'button-option',
		value: JSON.stringify(animations.fromButton),
		label: 'Show Dialog from Button',
	},
];

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: styles,
		},
	];
};

export default function DialogElementRoute() {
	const openBtnRef = React.useRef<HTMLButtonElement>(null!);
	const dialogRef = React.useRef<HTMLDialogElement>(null!);
	const dialogContentRef = React.useRef<HTMLDivElement>(null!);

	const [selectedAnimation, setSelectedAnimation] = React.useState(
		animations.fromTop,
	);

	React.useEffect(() => {
		let closeTimer: NodeJS.Timeout;
		const dialog = dialogRef.current;

		const clickOutside = (event: Event, preventDefault?: boolean) => {
			if (preventDefault) {
				event.preventDefault();
			}

			const { target } = event;
			if (
				dialog.open &&
				target instanceof Node &&
				!dialogContentRef.current.contains(target)
			) {
				dialog.style.animationName = selectedAnimation.hide;

				closeTimer = setTimeout(() => {
					dialog.style.animationName = '';
					dialog.close();
					document.body.style.overflow = 'initial';
				}, 290);
			}
		};

		dialog.style.animationName = selectedAnimation.show;
		document.body.addEventListener('click', clickOutside);
		dialog.addEventListener('cancel', (event) => clickOutside(event, true));

		return () => {
			document.body.removeEventListener('click', clickOutside);
			dialog.removeEventListener('cancel', clickOutside);
			clearTimeout(closeTimer);
		};
	}, [selectedAnimation]);

	const openDialog = () => {
		const dialog = dialogRef.current;
		document.body.style.overflow = 'hidden';

		const { top, left, width, height } =
			openBtnRef.current.getBoundingClientRect();
		dialog.style.setProperty('--btn-top', valueToCssUnit(top));
		dialog.style.setProperty('--btn-left', valueToCssUnit(left));
		dialog.style.setProperty('--btn-width', valueToCssUnit(width));
		dialog.style.setProperty('--btn-height', valueToCssUnit(height));

		dialog.style.animationName = selectedAnimation.show;
		dialog.showModal();
	};

	const handleAnimationChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const animation = JSON.parse(event.target.value) as Animation;
		setSelectedAnimation(animation);
	};

	return (
		<div className="container">
			<button ref={openBtnRef} onClick={openDialog} className="button">
				Open Dialog
			</button>

			<select
				className="select"
				value={JSON.stringify(selectedAnimation)}
				onChange={handleAnimationChange}
			>
				{animationsOptions.map(({ key, value, label }) => (
					<option key={key} value={value}>
						{label}
					</option>
				))}
			</select>

			<dialog ref={dialogRef} className="dialog">
				<div ref={dialogContentRef} className="dialog-content" />
			</dialog>
		</div>
	);
}
