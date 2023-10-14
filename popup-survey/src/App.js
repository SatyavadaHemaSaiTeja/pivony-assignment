import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import PopupSurvey from "./PopupSurvey";
import { Button } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { getDataByDocId, updateDataWithDocId } from "./firebase";

// function App() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [waitTime, setWaitTime] = useState(0);
//   const [displayTimes, setDisplayTimes] = useState(0);
//   const [frequency, setFrequency] = useState(0);

//   const handleInputChange = (setter, maxValue) => (e) => {
//     const newValue = parseInt(e.target.value, 10);
//     if (
//       !isNaN(newValue) &&
//       newValue >= 0 &&
//       (!maxValue || newValue <= maxValue)
//     ) {
//       setter(newValue);
//     }
//   };

//   useEffect(()=>{
//    console.log(getDataByDocId())
//    updateDataWithDocId({
//     displayTimes:0,
//     frequency:0,
//     waitTime:0
//    })
//   },[])

//   return (
//     <>
//       <div className="App-nav">
//         <Tooltip title="Preview">
//           <VisibilityIcon className="icon" onClick={() => setShowPopup(true)} />
//         </Tooltip>
//         <Tooltip title="Settings">
//           <SettingsIcon className="icon" />
//         </Tooltip>
//       </div>
//       <div className="main-body">
//         <div className="Title">
//           Pivony
//           <br />
//           Popup Survey
//         </div>
//         <div className="configform">
//           <div className="config-header">Set up Configuration</div>
//           <div className="config-body">
//             <NumberInput
//               label="Choose How much time to wait before showing the survey"
//               unit="seconds"
//               value={waitTime}
//               onIncrease={() => setWaitTime((prev) => prev + 1)}
//               onDecrease={() => setWaitTime((prev) => Math.max(prev - 1, 0))}
//               onChange={handleInputChange(setWaitTime)}
//             />
//             <NumberInput
//               label="Choose how many times to show the survey"
//               unit="times"
//               value={displayTimes}
//               onIncrease={() => setDisplayTimes((prev) => prev + 1)}
//               onDecrease={() =>
//                 setDisplayTimes((prev) => Math.max(prev - 1, 0))
//               }
//               onChange={handleInputChange(setDisplayTimes)}
//             />
//             <NumberInput
//               label="Display Frequency - every"
//               otherOptions="1min, 5min, 30min"
//               value={frequency}
//               onIncrease={() => setFrequency((prev) => Math.min(prev + 1, 30))}
//               onDecrease={() => setFrequency((prev) => Math.max(prev - 1, 0))}
//               onChange={handleInputChange(setFrequency, 30)}
//             />
//           </div>
//           <div className="config-footer">
//             <Button variant="contained" color="secondary" size="small">
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>
//       {showPopup && (
//         <PopupSurvey
//           onClose={() => setShowPopup(false)}
//           showPopup={showPopup}
//         />
//       )}
//     </>
//   );
// }

// function NumberInput({
//   label,
//   unit,
//   otherOptions,
//   value,
//   onIncrease,
//   onDecrease,
//   onChange,
// }) {
//   return (
//     <div className="config-input-group">
//       <label>{label}</label>
//       <div className="d-flex">
//         <div className="btngrp">
//           <KeyboardArrowLeftOutlinedIcon
//             className="inc-dc-icon"
//             fontSize="small"
//             onClick={onDecrease}
//           />
//           <input className="custom-input" value={value} onChange={onChange} />
//           <KeyboardArrowRightOutlinedIcon
//             className="inc-dc-icon"
//             fontSize="small"
//             onClick={onIncrease}
//           />
//         </div>
//         {unit}
//       </div>
//       {otherOptions && <div>Other Options: {otherOptions}</div>}
//     </div>
//   );
// }

// export default App;

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [waitTime, setWaitTime] = useState(0);
  const [displayTimes, setDisplayTimes] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [isFormVisible, setFormVisible] = useState(false);
  const displayCountRef = useRef(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (setter, maxValue) => (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (
      !isNaN(newValue) &&
      newValue >= 0 &&
      (!maxValue || newValue <= maxValue)
    ) {
      setter(newValue);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataByDocId();
      if (data) {
        setWaitTime(data.waitTime || 0);
        setDisplayTimes(data.displayTimes || 0);
        setFrequency(data.frequency || 0);
      }
    };
    fetchData();
  }, []);

  const handleStart = () => {
    setIsProcessing(true);
    displayCountRef.current = 0;
    setTimeout(() => {
      displayPopup();
      const intervalId = setInterval(() => {
        if (displayCountRef.current < displayTimes - 1) {
          displayPopup();
        } else {
          clearInterval(intervalId);
        }
      }, frequency * 60 * 1000); // convert frequency to milliseconds
    }, waitTime * 1000); // convert waitTime to milliseconds
  };

  const displayPopup = () => {
    setShowPopup(true);
    displayCountRef.current += 1;
  };

  const handleSave = async () => {
    try {
      await updateDataWithDocId({
        displayTimes: displayTimes,
        frequency: frequency,
        waitTime: waitTime,
      });
      console.log("Settings saved successfully!");
      setFormVisible(false);
    } catch (error) {
      console.error("Error saving settings: ", error);
    }
  };

  return (
    <>
      <div className="App-nav">
        <Tooltip title="Preview">
          <VisibilityIcon className="icon" onClick={(e) => setShowPopup(true)} disabled={isProcessing}/>
        </Tooltip>
        <Tooltip title="Settings">
          <SettingsIcon className="icon" onClick={(e) => setFormVisible(prev => !prev)} disabled={isProcessing}/>
        </Tooltip>
      </div>
      {isFormVisible ? (
        <div className="configform">
          <div className="config-header">Set up Configuration</div>
          <div className="config-body">
            <NumberInput
              label="Choose How much time to wait before showing the survey"
              unit="seconds"
              value={waitTime}
              onIncrease={() => setWaitTime((prev) => prev + 1)}
              onDecrease={() => setWaitTime((prev) => Math.max(prev - 1, 0))}
              onChange={handleInputChange(setWaitTime)}
            />
            <NumberInput
              label="Choose how many times to show the survey"
              unit="times"
              value={displayTimes}
              onIncrease={() => setDisplayTimes((prev) => prev + 1)}
              onDecrease={() =>
                setDisplayTimes((prev) => Math.max(prev - 1, 0))
              }
              onChange={handleInputChange(setDisplayTimes)}
            />
            <NumberInput
              label="Display Frequency - every"
              otherOptions="1min, 5min, 30min"
              value={frequency}
              onIncrease={() => setFrequency((prev) => Math.min(prev + 1, 30))}
              onDecrease={() => setFrequency((prev) => Math.max(prev - 1, 0))}
              onChange={handleInputChange(setFrequency, 30)}
            />
          </div>
          <div className="config-footer">
            <Button variant="contained" color="secondary" size="small" onClick={(e)=>handleSave()}>
              Save
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleStart} disabled={isProcessing}>
          Start
        </Button>
      )}

      {showPopup && (
        <PopupSurvey
          onClose={() => setShowPopup(false)}
          showPopup={showPopup}
        />
      )}
    </>
  );
}

function NumberInput({
  label,
  unit,
  otherOptions,
  value,
  onIncrease,
  onDecrease,
  onChange,
}) {
  return (
    <div className="config-input-group">
      <label>{label}</label>
      <div className="d-flex">
        <div className="btngrp">
          <KeyboardArrowLeftOutlinedIcon
            className="inc-dc-icon"
            fontSize="small"
            onClick={onDecrease}
          />
          <input
            className="custom-input"
            type="number"
            value={value}
            onChange={onChange}
          />
          <KeyboardArrowRightOutlinedIcon
            className="inc-dc-icon"
            fontSize="small"
            onClick={onIncrease}
          />
        </div>
        <span>{unit}</span>
      </div>
      {otherOptions && <div>Other Options: {otherOptions}</div>}
    </div>
  );
}

export default App;
