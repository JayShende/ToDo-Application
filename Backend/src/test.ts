import moment from "moment";

var str = '2011-04-11T10:20:30Z';
var date = moment(str);
var dateComponent = date.utc().format('YYYY-MM-DD');
var timeComponent = date.utc().format('HH:mm:ss');
console.log(dateComponent);
console.log(timeComponent);