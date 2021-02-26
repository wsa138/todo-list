import {format} from 'date-fns'

const todaysDate = new Date()
const formattedDate = format(todaysDate, 'MM-dd-yyyy')

console.log(todaysDate); 
console.log(formattedDate)