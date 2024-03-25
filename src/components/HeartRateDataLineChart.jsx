import {useEffect, useState} from 'react'

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import {Scatter} from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
        x: {
            type: 'time',
            time: {
                unit: 'hour',
            },
        },
    },
    maintainAspectRatio: false,
};

const HeartRateDataLineChart = ({ prop }) => {
    const [heartRate, setHeartRate] = useState({
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: "",
            }
        ]
    });

    const Chart = () => {
        let data = [];
        let heartRateReadings = [];

        data = prop;
        data.forEach(dataObj => {
            heartRateReadings.push({
                x: dataObj.rateDateTime,
                y: dataObj.rate,
            });
        });
        if (heartRateReadings.length === 0) {
            setHeartRate(null);
        } else {
            setHeartRate({
                datasets: [
                    {
                        label: "Heart Rate",
                        data: heartRateReadings,
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    }]
            });
        }
    }

    useEffect(() => {
        Chart();
    }, [prop]); // Need props here to ensure this component re-renders with new props

    return (
        <div>
            {heartRate? (
                <div className={"h-96"}>
                    <Scatter data={heartRate} options={options}/>
                </div>
            ) : (
                <p>Heartbeat data does not exist</p>
            )}
        </div>
    )
}

export default HeartRateDataLineChart;