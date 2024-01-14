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

const App = () => {
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

        axios.get("http://localhost:8080/api/environmentdata")
            .then(res => {
                sorted = res.data;
                sorted.sort((a,b) => new Date(a.envDateTime) - new Date(b.envDateTime));
                console.log(sorted);
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
            })
            .catch(err => {
                console.log(err);
            })
    }

    const GetSleepDate = () => {
        let sleepDateSorted = [];

        axios.get("http://localhost:8080/api/sleepdate")
            .then(res => {
                sleepDateSorted = res.data;
                sleepDateSorted.sort((a,b) => new Date(a.sleepDateTimeFrom) - b.sleepDateTimeFrom);
                console.log(sleepDateSorted);
            })
    }

    useEffect(() => {
        Chart();
        GetSleepDate();
    }, []);

    return (
        <div>
            <h2>Bar Chart</h2>
            <Line data={data} options={options} />
        </div>
    )
}

export default App;
