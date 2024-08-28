export function formatNiceDate(dateString) {
	const date = new Date(dateString)
	const options = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
	}
	const formattedDate = date.toLocaleString('en-US', options).replace(',', ' 𝍄')
	return formattedDate
}

// const formattedDate = formatNiceDate('August 27 - 13:57:07')
// console.log(formattedDate) // Output: 8/27/24 - 1:57 PM
