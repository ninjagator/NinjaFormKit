export function bytesToHumanReadable(size: number) {
	const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
	const num = size / Math.pow(1024, i);
	const round = Math.round(num * 100) / 100;
	const unit = ['B', 'KB', 'MB', 'GB', 'TB'][i];
	return `${round} ${unit}`;
}
