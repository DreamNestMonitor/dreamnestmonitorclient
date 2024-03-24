import moment from "moment/moment.js";

function millisecondsToHMS(milliseconds) {
    // Convert milliseconds to seconds
    let totalSeconds = milliseconds / 1000;

    // Calculate hours
    const hours = Math.floor(totalSeconds / 3600);

    // Calculate remaining seconds after removing hours
    totalSeconds %= 3600;

    // Calculate minutes
    const minutes = Math.floor(totalSeconds / 60);

    // Calculate remaining seconds after removing minutes
    const seconds = Math.floor(totalSeconds % 60);

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

const SummaryInfo = ({ prop }) => {

    let sleepDateTimeFrom = new Date(prop.sleepDateTimeFrom).getTime();
    let sleepDateTimeTo = new Date(prop.sleepDateTimeTo).getTime();
    let { hours, minutes, seconds }= millisecondsToHMS(sleepDateTimeTo - sleepDateTimeFrom);

    return (
       <div className={"mt-2 mb-2"}>
           <div>You fell asleep on:
               <i> {moment(prop.sleepDateTimeFrom).format("MMMM D, YYYY, h:mm:ss A")}</i>
           </div>
           <div>You woke up on:
               <i> {moment(prop.sleepDateTimeTo).format("MMMM D, YYYY, h:mm:ss A")}</i>
           </div>
           <div>You slept for:
               <i> {hours}h {minutes}m and {seconds}s</i>
           </div>
       </div>
    )
}

export default SummaryInfo;