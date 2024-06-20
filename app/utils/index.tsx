export function valueToCssUnit(value: number, unit: string = 'px') {
	return `${parseFloat(value.toString())}${unit}`;
}

export function getRandomInt(min: number, max: number) {
	const minValue = Math.ceil(min);
	const maxValue = Math.floor(max);

	return Math.random() * (maxValue - minValue) + minValue;
}
