import SleepDateRangeDropDown from "./components/SleepDateRangeDropDown.jsx";

const App = () => {
    return (
        <div>
            <div className={"bg-green-300 flex items-center justify-between"}>
                <img src={"/logo.png"} alt={"logo"} className={"order-1 w-26 h-20"}/>
                <p className={"text-5xl order-2 ml-20 font-bold"}>DreamNest Monitor</p>
                <p className={"order-3 mr-2"}>Members: <i>Daniel</i>, <i>Frank</i></p>
            </div>
            <div className={"w-5/6 mx-auto"}>
                <SleepDateRangeDropDown/>
            </div>
        </div>
    )
}

export default App;
