const Correlations = ({ prop }) => {

    return (
        <div className={"mt-5 mb-2"}>
            <div>Temperature correlation on sleep
                quality: <b>{prop.temperatureCor === -1 ? "N/A" : prop.temperatureCor + "%"}</b></div>
            <div>Brightness correlation on sleep
                quality: <b>{prop.brightnessCor === -1 ? "N/A" : prop.brightnessCor + "%"}</b></div>
            <div>Noise correlation on sleep quality: <b>{prop.noiseCor === -1 ? "N/A" : prop.noiseCor + "%"}</b></div>
        </div>
)
}

export default Correlations;