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

export const parentOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
        },
    },
};

export const temperatureOption= {
    ...parentOptions,
    plugins: {
        ...parentOptions.plugins,
        title: {
            ...parentOptions.plugins.title,
            text: "Temperature Fluctuations"
        },
    },
};

export const brightnessOption= {
    ...parentOptions,
    plugins: {
        ...parentOptions.plugins,
        title: {
            ...parentOptions.plugins.title,
            text: "Brightness Fluctuations"
        },
    },
};

export const noiseOption= {
    ...parentOptions,
    plugins: {
        ...parentOptions.plugins,
        title: {
            ...parentOptions.plugins.title,
            text: "Noise Fluctuations"
        },
    },
};

export const heartRateOption= {
    ...parentOptions,
    plugins: {
        ...parentOptions.plugins,
        title: {
            ...parentOptions.plugins.title,
            text: "HeartRate Fluctuations"
        },
    },
};

const EnvironmentDataLineCharts = ({ prop }) => {
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
    const [brightnessData, setBrightnessData] = useState({
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
    const [noiseData, setNoiseData] = useState({
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
        let tempReading = [];
        let brightnessReading = [];
        let noiseReading = [];

        sorted = prop;
        sorted.sort((a,b) => new Date(a.envDateTime) - new Date(b.envDateTime));
        sorted.forEach(dataObj => {
            time.push(dataObj.envTime);
            tempReading.push(dataObj.temp);
            brightnessReading.push(dataObj.brightness);
            noiseReading.push(dataObj.noise);
        })
        setData({
            labels: time,
            datasets: [
                {
                    label: "Temp",
                    data: tempReading,
                    borderColor: "rgb(255,99,132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                }]
        });
        setBrightnessData({
            labels: time,
            datasets: [
                {
                    label: "Brightness",
                    data: brightnessReading,
                    borderColor: "rgb(225,231,21)",
                    backgroundColor: "rgba(168,241,132,0.5)",
                }]
        });
        setNoiseData({
            labels: time,
            datasets: [
                {
                    label: "Noise",
                    data: noiseReading,
                    borderColor: "rgb(50,83,205)",
                    backgroundColor: "rgba(0,31,189,0.5)",
                }]
        });
    }

    useEffect(() => {
        Chart();
    }, [prop]); // Need props here to ensure this component re-renders with new props

    return (
        <div>
            <Line data={data} options={temperatureOption} />
            <Line data={brightnessData} options={brightnessOption} />
            <Line data={noiseData} options={noiseOption} />
        </div>
    )
}

export default EnvironmentDataLineCharts;