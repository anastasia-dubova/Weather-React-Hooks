const getDate = (inputTimestamp, tz) =>{
    const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    var currentDate = new Date((inputTimestamp+tz)*1000);
    let date = currentDate.getUTCDate();
    let month = currentDate.getUTCMonth();
    let year = currentDate.getUTCFullYear();
    return (date + ' ' + MONTHS[month] + ' ' + year);
}
const getTime = (inputTimestamp, tz) =>{
    var currentDate = new Date((inputTimestamp+tz)*1000);
    let hours = currentDate.getUTCHours();
    let minutes = currentDate.getUTCMinutes();
    return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
}
const getDayOfWeek = (inputTimestamp, tz) =>{
    const DaysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    var currentDate = new Date((inputTimestamp+tz)*1000);
    let day = currentDate.getUTCDay();
    return DaysOfWeek[day];
}
//1 hPa = 0.75006375541921 mmHg
const convertHpaToMmhg = (hpa) => hpa*0.75006375541921;

export {getDate, getTime, getDayOfWeek, convertHpaToMmhg};