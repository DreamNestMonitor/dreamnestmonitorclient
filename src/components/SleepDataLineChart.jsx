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
            text: "Sleep Level Fluctuations"
        },
    },
    scales: {
        y: {
            type: 'category',
            labels: ["rem", "deep", "light", "wake"]
        },
        x: {
            type: 'time',
            time: {
                unit: 'hour'
            }
        }
    },
};

const SleepDataLineChart = ({ prop }) => {
    const [data, setData] = useState({
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
        let sleepData= [];
        let time = [];
        let sleepDataReadings = [];

        // we can just let chart js sort the time i.e., put sdDateTimeFrom in time
        sleepData = prop;
        sleepData.forEach(dataObj => {
            time.push(dataObj.sdDateTimeFrom);
            sleepDataReadings.push(dataObj.level);
        })
        // add the sdDateTimeTo of the last element since there is a cutoff. The reading itself doesn't matter
        time.push(sleepData[sleepData.length - 1].sdDateTimeTo);
        sleepDataReadings.push(sleepData[sleepData.length - 1].level);
        if (sleepDataReadings.length === 0) {
            // If empty, set data to null
            setData(null);
        } else {
            setData({
                labels: time,
                datasets: [
                    {
                        label: "Sleep Levels",
                        data: sleepDataReadings,
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
            {data ? (
                <Line data={data} options={option}/>
            ) : (
                <p>Sleep data does not exist</p>
            )}
        </div>
    )
}

export default SleepDataLineChart;