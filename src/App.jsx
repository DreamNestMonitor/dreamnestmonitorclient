import SleepDateRangeDropDown from "./components/SleepDateRangeDropDown.jsx";

const App = () => {
    return (
        <div>
            <div className={"w-5/6 mx-auto"}>
                <img src={"/logo.png"} alt={"logo"} className={"w-30 h-24"}/>
                <div className={"text-5xl text-center mb-2"}>DreamNest Monitor</div>
                <hr/>
                <SleepDateRangeDropDown/>
            </div>
        </div>
    )
}

export default App;
