// format decimal to currency
const CURREYNCY_FORMAT = new Intl.NumberFormat('ph-PH', {
	currency: 'PHP',
	style: 'currency',
});

export function formatPesos(value) {
	return CURREYNCY_FORMAT.format(value);
}
