import { useState, useEffect } from 'react';
import axios from 'axios';
import EnvironmentDataLineCharts from "./EnvironmentDataLineCharts.jsx";
import moment from "moment";
import HeartRateDataLineChart from "./HeartRateDataLineChart.jsx";
import SleepDataLineChart from "./SleepDataLineChart.jsx";
import SummaryInfo from "./SummaryInfo.jsx";
import ShortWakeStepLine from "./ShortWakeStepLine.jsx";
import Correlations from "./Correlations.jsx";

const SleepDateRangeDropDown = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [prop, setProp] = useState([{
        environmentDataID: "",
        envDateTime: "",
        envDate: "",
        envTime: "",
        temp: 0,
        brightness: 0,
        loud: 0,
        quiet: 0,
    }])
    const [heartRateProp, setHeartRateProp] = useState([{
        rateDateTime: "",
        rate: 0,
    }])
    const [sleepDataProp, setSleepDataProp] = useState([{
        sleepDataID: "",
        sdDateTimeFrom: "",
        sdDateFrom: "",
        sdTimeFrom: "",
        sdDateTimeTo: "",
        sdDateTo: "",
        sdTimeTo: "",
        seconds: 0,
        level: "",
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
    const [fromAndTo, setFromAndTo] = useState({
        sleepDateTimeFrom: "",
        sleepDateTimeTo: "",
    });
    const [shortWake, setShortWake] = useState([{
        shortWakeID: "",
        swDateTimeFrom: "",
        swDateFrom: "",
        swTimeFrom: "",
        swDateTimeTo: "",
        swDateTo: "",
        swTimeTo: "",
        seconds: 0,
    }])

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []);

    const fetchData = () => {
        // axios.get('http://localhost:8080/api/sleepdate')
        axios.get('https://mirthful-seat-production.up.railway.app/api/sleepdate')
            .then((response) => {
                let sleepDates = response.data;
                sleepDates.sort((a,b) => new Date(a.sleepDateTimeFrom) - new Date(b.sleepDateTimeFrom));
                // sort the dates just in case
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
        setFromAndTo({"sleepDateTimeFrom": sleepDateTimeFrom, "sleepDateTimeTo": sleepDateTimeTo});
        // axios.get(`http://localhost:8080/api/environmentdata/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
        axios.get(`https://mirthful-seat-production.up.railway.app/api/environmentdata/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
            .then((response) => {
                setProp(response.data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error fetching data based on selection:', error);
            });
        // axios.get(`http://localhost:8080/api/heartrate/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
        axios.get(`https://mirthful-seat-production.up.railway.app/api/heartrate/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
            .then((response) => {
                setHeartRateProp(response.data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error fetching data based on selection:', error);
            });
        // axios.get(`http://localhost:8080/api/sleepdata/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
        axios.get(`https://mirthful-seat-production.up.railway.app/api/sleepdata/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
            .then((response) => {
                setSleepDataProp(response.data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error fetching data based on selection:', error);
            });
        // axios.get(`http://localhost:8080/api/shortwake/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
        axios.get(`https://mirthful-seat-production.up.railway.app/api/shortwake/range?from=${sleepDateTimeFrom}&to=${sleepDateTimeTo}`)
            .then((response) => {
                setShortWake(response.data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error fetching data based on selection:', error);
            });
    };

    return (
        <div>
            <div className={"mt-2"}>
                <label htmlFor="dropdown">Select Sleep Schedule:</label>
            </div>
            <div className={"mt-1"}>
            <select className={"border border-gray-400"} id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select...</option>
                {data.map((item) => (
                    <option key={item.sleepDateID} value={`${item.sleepDateTimeFrom}|${item.sleepDateTimeTo}`}>
                        {moment(item.sleepDateTimeFrom).format("MMMM D, YYYY, h:mm:ss A")}
                    </option>
                ))}
                </select>
            </div>

            {selectedOption ? (
                <>
                    <div className={"text-3xl mt-2 underline decoration-green-300 decoration-8 font-semibold"}>Correlations</div>
                    <Correlations />
                    <div className={"text-2xl mt-2 underline decoration-green-300 decoration-8 font-semibold"}>Summary</div>
                    <SummaryInfo prop={fromAndTo}/>
                    <div className={"text-2xl mt-2 underline decoration-green-300 decoration-8 font-semibold"}>Conditions</div>
                    <EnvironmentDataLineCharts prop={prop}/>
                    <HeartRateDataLineChart prop={heartRateProp}/>
                    <SleepDataLineChart prop={sleepDataProp}/>
                    <ShortWakeStepLine prop={shortWake} />
                </>
            ) : null}
        </div>
    );
};

export default SleepDateRangeDropDown;