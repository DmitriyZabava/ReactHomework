export function formatDate(date) {
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

    if (differenceDate <= 60000) {
        return "- 1 минуту назад";
    } else if (differenceDate > 60000 && differenceDate <= 5 * 60000) {
        return "- 5 минут назад";
    } else if (differenceDate > 5 * 60000 && differenceDate <= 600000) {
        return "- 10 минут назад";
    } else if (differenceDate > 600000 && differenceDate <= 30 * 60000) {
        return "- 30 минут назад";
    } else if (differenceDate > 30 * 60000 && differenceDate <= 24 * 3600000) {
        return `- в ${commentDate.getHours()}ч. : ${commentDate.getMinutes()}мин.`;
    } else if (differenceDate > 24 * 3600000 && differenceDate < 31536000000) {
        return `- ${commentDate.getDay()}  
        ${months[commentDate.getMonth()]}`;
    } else if (differenceDate > 31536000000) {
        return `- ${commentDate.getDay()}  
        ${months[commentDate.getMonth()]} 
        ${commentDate.getFullYear()}г.`;
    }
}

// 31536000000 год в милесекундах
