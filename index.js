// Create a new employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Create an array of employee records
function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
}

// Add a time-in event to the employee record
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({ type: 'TimeIn', hour: parseInt(hour), date });
    return this;
}

// Add a time-out event to the employee record
function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({ type: 'TimeOut', hour: parseInt(hour), date });
    return this;
}

// Calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(e => e.date === date);
    const timeOut = this.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

// Calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

// Calculate all wages for an employee
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(e => e.date);
    return eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate.call(this, d), 0);
};

// Find an employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

// Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, record) => memo + allWagesFor.call(record), 0);
}
