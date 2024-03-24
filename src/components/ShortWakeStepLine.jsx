import {useEffect, useState} from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const option = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: "Short Wake-ups"
        },
    },
    scales: {
        y: {
            type: 'category',
            labels: ["wake", "sleep"]
        },
        x: {
            type: 'time',
            time: {
                unit: 'hour'
            }
        }
    },
};

const ShortWakeStepLine = ({ prop }) => {
    const [shortWake, setShortWake] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                borderColor: "",
                backgroundColor: "",
            }
        ]
    });

    const Chart = () => {
        let data = [];
        let time = [];
        let shortWakeReadings = [];

        data = prop;
        data.forEach(dataObj => {
            time.push(dataObj.swDateTimeFrom);
            shortWakeReadings.push("wake");
            time.push(dataObj.swDateTimeTo);
            shortWakeReadings.push("sleep");
        });
        if (shortWakeReadings.length === 0) {
            setShortWake(null);
        } else {
            setShortWake({
                labels: time,
                datasets: [
                    {
                        label: "Sleep Levels",
                        data: shortWakeReadings,
                        borderColor: "rgb(164,75,215)",
                        backgroundColor: "rgba(161,32,238,0.5)",
                        stepped: true,
                    }]
            });
        }
    }

    useEffect(() => {
        Chart();
    }, [prop]); // Need props here to ensure this component re-renders with new props

    return (
        <div>
            {shortWake? (
                <Line data={shortWake} options={option}/>
            ) : (
                <p>Short wake data does not exist</p>
            )}
        </div>
    )
}

export default ShortWakeStepLine;