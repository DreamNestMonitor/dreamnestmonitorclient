import SleepDateRangeDropDown from "./components/SleepDateRangeDropDown.jsx";

const App = () => {
    return (
        <div className={"w-5/6 mx-auto"}>
            <div className={"text-5xl text-center mt-2 mb-2"}>Dreamnest Monitor</div>
            <hr />
            <SleepDateRangeDropDown />
        </div>
    )
}

export default App;
