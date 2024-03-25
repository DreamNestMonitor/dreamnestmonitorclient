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

export const option1 = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'hour',
            },
        },
    },
};

export const option2= {
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

export const option3= {
    scales: {
        y: {
            type: 'category',
            labels: [1.0, 0.0]
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
    const [loudData, setLoudData] = useState({
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: "",
            }
        ]
    });
    const [quietData, setQuietData] = useState({
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: "",
            }
        ]
    });
    const Chart = () => {
        let data = prop;
        let tempData = [];
        let brightnessData = [];
        let loudData = [];
        let quietData = [];
        data.forEach(dataObj => {
            tempData.push({
                x: dataObj.envDateTime,
                y: dataObj.temp,
            });
            brightnessData.push({
                x: dataObj.envDateTime,
                y: dataObj.brightness,
            });
            loudData.push({
                x: dataObj.envDateTime,
                y: dataObj.loud,
            });
            quietData.push({
                x: dataObj.envDateTime,
                y: dataObj.quiet,
            });
        });
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
        setLoudData({
            datasets: [
                {
                    label: "loud noise",
                    data: loudData,
                    backgroundColor: "rgba(0,31,189,0.5)",
                }
            ]
        });
        setQuietData({
            datasets: [
                {
                    label: "quiet noise",
                    data: quietData,
                    backgroundColor: "rgba(0,31,189,0.5)",
                }
            ]
        });
    };

    useEffect(() => {
        Chart();
    }, [prop]); // Need props here to ensure this component re-renders with new props

    return (
        <div className={"mt-5"}>
            {temperatureData.datasets[0].data.length !== 0 ? (
                <Scatter data={temperatureData} options={option1} />
            ) : (
                <p>Temperature data does not exist!</p>
            )}
            {brightnessData.datasets[0].data.length !== 0 ? (
                <Scatter data={brightnessData} options={option2} />
            ) : (
                <p>Brightness data does not exist!</p>
            )}
            {loudData.datasets[0].data.length !== 0 ? (
                <Scatter data={loudData} options={option3} />
            ) : (
                <p>Loud Noise data does not exist!</p>
            )}
            {quietData.datasets[0].data.length !== 0 ? (
                <Scatter data={quietData} options={option3} />
            ) : (
                <p>Quiet Noise data does not exist!</p>
            )}
        </div>
    )
}

export default EnvironmentDataLineCharts;