

 import { CSVFileValidator, ICSVFile } from "csv-file-validator"

const requiredError = (headerName: any, rowNumber: any, columnNumber: any) => {
	return `<div class="red">${headerName} is required in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`
}
const validateError = (headerName: any, rowNumber: any, columnNumber: any) => {
	return `<div class="red">${headerName} is not valid in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`
}
const uniqueError = (headerName: any, rowNumber: any) => {
	return `<div class="red">${headerName} is not unique at the <strong>${rowNumber} row</strong></div>`
}
const isEmailValid = function (email: string) {
	const reqExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
	return reqExp.test(email)
}
const isPasswordValid = function (password: string | any[]) {
	return password.length >= 4
}

const CSVConfig: ICSVFile = {
	headers: [
		{ name: 'First Name', inputName: 'firstName', required: true, requiredError },
		{ name: 'Last Name', inputName: 'lastName', required: true, requiredError, optional: true },
		{ name: 'Email', inputName: 'email', required: true, requiredError, unique: true, uniqueError, validate: isEmailValid, validateError },
		{ name: 'Password', inputName: 'password', required: true, requiredError, validate: isPasswordValid, validateError },
		{ name: 'Roles', inputName: 'roles', required: true, requiredError, isArray: true }
	]
}

// document.getElementById('file').onchange = function (event) {
// 	CSVFileValidator(event.target.files[0], CSVConfig)
// 		.then(csvData => {
// 			csvData.inValidMessages.forEach(message => {
// 				document.getElementById('invalidMessages').insertAdjacentHTML('beforeend', message)
// 			})
// 			console.log(csvData.inValidMessages)
// 			console.log(csvData.data)
// 		})
// }

document.getElementById('file').onchange = function (event) {
	CSVFileValidator(event.target as unknown as string, CSVConfig)
		.then(csvData => {
			csvData.inValidMessages.forEach(message => {
				document.getElementById('invalidMessages').insertAdjacentHTML('beforeend', message as unknown as string)
			})
			console.log(csvData.inValidMessages)
			console.log(csvData.data)
		})
}
