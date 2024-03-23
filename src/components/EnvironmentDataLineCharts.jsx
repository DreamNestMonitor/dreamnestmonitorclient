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
};

const EnvironmentDataLineCharts = ({ prop }) => {
    const [temperatureData, setTemperatureData] = useState({
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: "",
            }
        ]
    });
    const [brightnessData, setBrightnessData] = useState({
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: "",
            }
        ]
    });
    const [noiseData, setNoiseData] = useState({
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: "",
            }
        ]
    });
    const Chart = () => {
        let sorted = prop;
        let tempData = [];
        let brightnessData = [];
        let noiseData = [];
        sorted.sort((a,b) => new Date(a.envDateTime) - new Date(b.envDateTime));
        sorted.forEach(dataObj => {
            tempData.push({
                x: dataObj.envTime,
                y: dataObj.temp,
            });
            brightnessData.push({
                x: dataObj.envTime,
                y: dataObj.brightness,
            });
            noiseData.push({
                x: dataObj.envTime,
                y: dataObj.noise,
            });
        });
        console.log("tempData: ", tempData);
        setTemperatureData({
            datasets: [
                {
                    label: "temperature",
                    data: tempData,
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                }
            ]
        });
        setBrightnessData({
            datasets: [
                {
                    label: "brightness",
                    data: brightnessData,
                    backgroundColor: "rgba(168,241,132,0.5)",
                }
            ]
        });
        setNoiseData({
            datasets: [
                {
                    label: "noise",
                    data: noiseData,
                    backgroundColor: "rgba(0,31,189,0.5)",
                }
            ]
        });
    };

    useEffect(() => {
        Chart();
    }, [prop]); // Need props here to ensure this component re-renders with new props

    return (
        <div>
            {temperatureData.datasets[0].data.length !== 0 ? (
                <Scatter data={temperatureData} options={options} />
            ) : (
                <p>Temperature data does not exist!</p>
            )}
            {brightnessData.datasets[0].data.length !== 0 ? (
                <Scatter data={brightnessData} options={options} />
            ) : (
                <p>Brightness data does not exist!</p>
            )}
            {noiseData.datasets[0].data.length !== 0 ? (
                <Scatter data={noiseData} options={options} />
            ) : (
                <p>Noise data does not exist!</p>
            )}
        </div>
    )
}

export default EnvironmentDataLineCharts;