// return local datetime string in 'YYYY-MM-DD HH:MM:SS' formate
function toLocalIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        ' ' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds());
}

// return shift start and end datetime string in YYYY-MM-DD HH:MM:SS formate and shift name by passed datetime
function getShiftTimeStrByDate( dateTime ) {
    const currentDateTime = dateTime;
    // morning shift
    if (currentDateTime.getHours() >= 7 && currentDateTime.getHours() < 15){
        return([toLocalIsoString(currentDateTime).split(" ")[0] + " 07:00:00", toLocalIsoString(currentDateTime).split(" ")[0] + " 14:59:59", "Morning"]);
    }
    // afternoon shift
    else if (currentDateTime.getHours() >= 15 && currentDateTime.getHours() < 23){
        return([toLocalIsoString(currentDateTime).split(" ")[0] + " 15:00:00", toLocalIsoString(currentDateTime).split(" ")[0] + " 22:59:59", "Afternoon"]);
    }
    else {
        // current hour is 23
        if (currentDateTime.getHours() >= 23){
            let endDateTime = new Date(currentDateTime.getTime());
            endDateTime.setDate(endDateTime.getDate() + 1);
            return([toLocalIsoString(currentDateTime).split(" ")[0] + " 23:00:00", toLocalIsoString(endDateTime).split(" ")[0] + " 06:59:59", "Night"]);
        }
        // current hour in [0,7)
        else {
            let startDateTime = new Date(currentDateTime.getTime());
            startDateTime.setDate(startDateTime.getDate() - 1);
            return([toLocalIsoString(startDateTime).split(" ")[0] + " 23:00:00", toLocalIsoString(currentDateTime).split(" ")[0] + " 06:59:59", "Night"]);
        }
    }
}

function getCurrentShiftTimeStr() {
    const currentDateTime = new Date();
    return getShiftTimeStrByDate(currentDateTime);
}

function getLastShiftTimeStr() {
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() - 8);
    return getShiftTimeStrByDate(currentDateTime);
}

function getLastTwoShiftTimeStr() {
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() - 16);
    return getShiftTimeStrByDate(currentDateTime);
}



module.exports = { getShiftTimeStrByDate, getCurrentShiftTimeStr, getLastShiftTimeStr, getLastTwoShiftTimeStr };