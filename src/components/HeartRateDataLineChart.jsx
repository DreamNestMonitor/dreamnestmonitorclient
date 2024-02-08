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
            text: "Heart Rate Fluctuations"
        },
    },
};

const HeartRateDataLineChart = ({ prop }) => {
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
        let heartRateReadings = [];

        sorted = prop;
        sorted.sort((a,b) => new Date(a.rateDateTime) - new Date(b.rateDateTime));
        sorted.forEach(dataObj => {
            time.push(dataObj.rateTime);
            heartRateReadings.push(dataObj.rate);
        })
        setData({
            labels: time,
            datasets: [
                {
                    label: "Heart Rate",
                    data: heartRateReadings,
                    borderColor: "rgb(255,99,132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                }]
        });
    }

    useEffect(() => {
        Chart();
    }, [prop]); // Need props here to ensure this component re-renders with new props

    return (
        <div>
            <Line data={data} options={option} />
        </div>
    )
}

export default HeartRateDataLineChart;