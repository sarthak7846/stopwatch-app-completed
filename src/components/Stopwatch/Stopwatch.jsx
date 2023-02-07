import { useState } from "react";

const Stopwatch = (props) => {
    const [time,setTime]=useState({h:0,m:0,s:0});
    const [status,setStatus]=useState(0);
    const [interv,setInterv] =useState();
    const [disabledState,setDisabledState]=useState(true);

    let updatedH = time.h,updatedM=time.m,updatedS=time.s;

    const startHandler = () => {
        setStatus(1);
        setDisabledState(false);
        setInterv(setInterval(run,1000));
    };

    const run = () => {
        if(updatedS===60) {
            updatedM++;
            updatedS=0;
        }
        if(updatedM===60) {
            updatedH++;
            updatedM=0;
        }
        updatedS++;
        return setTime({h:updatedH,m:updatedM,s:updatedS});
    }

    const pauseHandler = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const resetHandler = () => {
        clearInterval(interv);
        setStatus(0);
        setDisabledState(true);
        setTime({h:0,m:0,s:0});
    };


    return <div>
        <h1>Stopwatch</h1>
        <p data-testid="time">{(time.h >= 10) ? time.h : "0"+time.h}:
        {(time.m >= 10) ? time.m : "0"+time.m}:
        {(time.s >= 10) ? time.s : "0"+time.s}
        </p>

        {(status === 0) ? <button name="start" data-testid="start" onClick={startHandler}>Start</button>:''}
        {(status === 1) ? <button name="pause" data-testid="pause" onClick={pauseHandler}>Pause</button>:''}
        {(status === 2) ? <button name="resume" data-testid="resume" onClick={startHandler}>Resume</button>:''}

        <button name="reset" data-testid="reset" disabled={disabledState} onClick={resetHandler}>Reset</button>
    </div>;
};

export default Stopwatch;