import { useState, useEffect } from 'react';
import axios from 'axios';
import EnvironmentDataLineCharts from "./EnvironmentDataLineCharts.jsx";
import moment from "moment";
import HeartRateDataLineChart from "./HeartRateDataLineChart.jsx";
import SleepDataLineChart from "./SleepDataLineChart.jsx";

const SleepDateRangeDropDown = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [prop, setProp] = useState([{
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                borderColor: "",
                backgroundColor: "",
            }
        ]
    }])
    const [heartRateProp, setHeartRateProp] = useState([{
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                borderColor: "",
                backgroundColor: "",
            }
        ]
    }])
    const [sleepDataProp, setSleepDataProp] = useState([{
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                borderColor: "",
                backgroundColor: "",
            }
        ]
    }])

    const [data, setData] = useState([{
        sleepDateID: "",
        sleepDateTimeFrom: "",
        sleepDateFrom: "",
        sleepDateTime: "",
        sleepDateTimeTo: "",
        sleepDateTo: "",
        sleepTimeTo: "",
    }]);

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/api/sleepdate')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        const datesFromAndTo = selectedValue.split('|');
        const sleepDateTimeFrom = datesFromAndTo[0];
        const sleepDateTimeTo = datesFromAndTo[1];
        axios.get(`http://localhost:8080/api/environmentdata/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
            .then((response) => {
                setProp(response.data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error fetching data based on selection:', error);
            });
        axios.get(`http://localhost:8080/api/heartrate/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
            .then((response) => {
                setHeartRateProp(response.data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error fetching data based on selection:', error);
            });
        axios.get(`http://localhost:8080/api/sleepdata/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
            .then((response) => {
                setSleepDataProp(response.data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error fetching data based on selection:', error);
            });
    };

    return (
        <div>
            <label htmlFor="dropdown">Start of Sleep Dates:</label>
            <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select...</option>
                {data.map((item) => (
                    <option key={item.sleepDateID} value={`${item.sleepDateTimeFrom}|${item.sleepDateTimeTo}`}>
                        {moment(item.sleepDateTimeFrom).format("MMMM D, YYYY, h:mm:ss A")}
                    </option>
                ))}
            </select>
            {selectedOption ? (
                <>
                    <EnvironmentDataLineCharts prop={prop}/>
                    <HeartRateDataLineChart prop={heartRateProp}/>
                    <SleepDataLineChart prop={sleepDataProp} />
                </>
            ) : null}
        </div>
    );
};

export default SleepDateRangeDropDown;