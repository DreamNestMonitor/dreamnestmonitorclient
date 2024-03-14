import moment from "moment/moment.js";

const SummaryInfo = ({ prop }) => {

    return (
       <>
           <div>Fell asleep at: {moment(prop.sleepDateTimeFrom).format("MMMM D, YYYY, h:mm:ss A")}</div>
           <div>Woke up at: {moment(prop.sleepDateTimeTo).format("MMMM D, YYYY, h:mm:ss A")}</div>
       </>
    )
}

export default SummaryInfo;