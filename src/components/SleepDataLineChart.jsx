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
        }
    }
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
        let sorted = [];
        let time = [];
        let sleepDataReadings = [];

        sorted = prop;
        sorted.sort((a,b) => new Date(a.sdDateTimeFrom) - new Date(b.sdDateTimeFrom));
        sorted.forEach(dataObj => {
            time.push(dataObj.sdTimeFrom);
            sleepDataReadings.push(dataObj.level);
        })
        console.log(sleepDataReadings);
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