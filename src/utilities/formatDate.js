export function getFormattedDate() {
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
	let yyyy = today.getFullYear();

	return `${yyyy}-${mm}-${dd}`;
	//return dd + '/' + mm + '/' + yyyy; // change form if you need
}

export function getFormattedDateTwo(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}
