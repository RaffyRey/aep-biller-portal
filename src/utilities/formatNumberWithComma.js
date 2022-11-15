export function numberWithCommas(x) {
	return x.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
