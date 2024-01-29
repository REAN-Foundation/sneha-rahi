import humanizeDuration from "humanize-duration";

export class TimeHelper {

    static addHours = (numOfHours: number, date = new Date()): Date => {
        date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
        return date;
    }

    static getHumanReadableDate(date:string): string {
        if (date) {
            return `${humanizeDuration(new Date().getTime()-new Date(date).getTime(),{ largest: 1, round: true })} ago`
        }
        return null;
    }
}
