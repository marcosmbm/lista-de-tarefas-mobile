function zeroLeft(num: number): string{
    return num < 10 ? `0${num}` : String(num);
}

function formattedDate(date?: Date): string{
    if(!date){
        return '';
    }

    let day = zeroLeft(date.getDate());
    let month = zeroLeft((date.getMonth() + 1));
    let year = zeroLeft(date.getFullYear());
    let hour = zeroLeft(date.getHours());
    let minutes = zeroLeft(date.getMinutes());
    
    return `${day}/${month}/${year} ${hour}:${minutes}`;
}

function dateToDatabaseString(date: Date): string {
    // yyyy-MM-dd HH:mm:ss
    return date.toJSON().slice(0, 19).replace('T', ' ');
}

function stringToDate(date: string): Date {
    return new Date(date.replace(' ', 'T'));
}

export {formattedDate, dateToDatabaseString, stringToDate};