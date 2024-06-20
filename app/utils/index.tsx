export function valueToCssUnit(value: number, unit: string = 'px') {
	return `${parseFloat(value.toString())}${unit}`;
}

export function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.random() * (max - min) + min;
}
