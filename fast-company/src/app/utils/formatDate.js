export function formatDate(date) {
    const oneMinute = 60000;
    const oneHour = 3600000;
    const oneDay = 86400000;
    const oneYear = 31536000000;
    const months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
    ];
    const commentDate = new Date(Number(date));
    const nowDate = new Date();
    const differenceDate = nowDate - commentDate;

    if (differenceDate <= oneMinute) {
        return "- 1 минуту назад";
    } else if (differenceDate > oneMinute && differenceDate <= 5 * oneMinute) {
        return "- 5 минут назад";
    } else if (
        differenceDate > 5 * oneMinute &&
        differenceDate <= 10 * oneMinute
    ) {
        return "- 10 минут назад";
    } else if (
        differenceDate > 10 * oneMinute &&
        differenceDate <= oneHour / 2
    ) {
        return "- 30 минут назад";
    } else if (differenceDate > oneHour / 2 && differenceDate <= oneDay) {
        return `- в ${commentDate.getHours()}ч. : ${commentDate.getMinutes()}мин.`;
    } else if (differenceDate > oneDay && differenceDate < oneYear) {
        return `- ${commentDate.getDay()}  
        ${months[commentDate.getMonth()]}`;
    } else if (differenceDate > oneYear) {
        return `- ${commentDate.getDay()}  
        ${months[commentDate.getMonth()]} 
        ${commentDate.getFullYear()}г.`;
    }
}
