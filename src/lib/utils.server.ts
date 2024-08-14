/**
 *
 * @param size number
 * @returns string
 */
export function bytesToHumanReadable(size: number) {
	const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	const num = size / Math.pow(1024, i);
	const round = Math.round(num * 100) / 100;
	const unit = ['B', 'KB', 'MB', 'GB', 'TB'][i];
	return `${round} ${unit}`;
}

/**
 *
 * @param arr Array<string|number>
 * @returns string
 */
export function arrayToCommaAndString(arr: Array<string | number>) {
	const last = arr.pop();

	return arr.join(',') + last;
}
