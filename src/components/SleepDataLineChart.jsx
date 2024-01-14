import {useEffect, useState} from 'react'
import axios from "axios";
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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Temperature Fluctuations',
        },
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
        let sorted = [];
        let tempTime = [];
        let tempReading = [];

        sorted = prop;
        sorted.sort((a,b) => new Date(a.envDateTime) - new Date(b.envDateTime));
        sorted.forEach(dataObj => {
            tempTime.push(dataObj.envTime);
            tempReading.push(dataObj.temp);
        })
        setData({
            labels: tempTime,
            datasets: [
                {
                    label: "Temp",
                    data: tempReading,
                    borderColor: "rgb(255,99,132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                }]
        });
    }

    useEffect(() => {
        Chart();
    }, [prop]);

    return (
        <div>
            <h2>Bar Chart</h2>
            <Line data={data} options={options} />
        </div>
    )
}

export default SleepDataLineChart;