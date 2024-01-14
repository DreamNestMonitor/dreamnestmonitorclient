import { useState, useEffect } from 'react';
import axios from 'axios';
import SleepDataLineChart from "./SleepDataLineChart.jsx";

const SleepDateRangeDropDown = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedDateFrom, setSelectedDateFrom] = useState("");
    const [selectedDateTo, setSelectedDateTo] = useState("");
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
        setSelectedDateFrom(sleepDateTimeFrom);
        setSelectedDateTo(sleepDateTimeTo);
        console.log("From: " + selectedDateFrom);
        console.log("To: " + selectedDateTo);
        axios.get(`http://localhost:8080/api/environmentdata/range?from=${selectedDateFrom}&to=${selectedDateTo}`)
            .then((response) => {
                console.log('Response:', response.data);
                setProp(response.data);
                // Handle the response data as needed
            })
            .catch((error) => {
                console.error('Error fetching data based on selection:', error);
            });
    };

    return (
        <div>
            <label htmlFor="dropdown">Select an option:</label>
            <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select...</option>
                {data.map((item) => (
                    <option key={item.sleepDateID} value={`${item.sleepDateTimeFrom}|${item.sleepDateTimeTo}`}>
                        {item.sleepDateTimeFrom}
                    </option>
                ))}
            </select>
            {prop ? <SleepDataLineChart prop={prop}/> : null}
        </div>
    );
};

export default SleepDateRangeDropDown;