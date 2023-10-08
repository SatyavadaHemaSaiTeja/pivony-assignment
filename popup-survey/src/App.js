import "./App.css";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import PopupSurvey from "./PopupSurvey";
import IconButton from "@mui/material/IconButton";
import { ButtonGroup, TextField } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [waitTime, setWaitTime] = useState(0);

  const handleIncrease = () => {
    setWaitTime((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (waitTime > 0) {
      setWaitTime((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="App-nav">
        <Tooltip title="Preview">
          <VisibilityIcon className="icon" onClick={() => setShowPopup(true)} />
        </Tooltip>
        <Tooltip title="Settings">
          <SettingsIcon className="icon" />
        </Tooltip>
      </div>
      <div className="main-body">
        <div className="Title">
          Pivony
          <br />
          Popup Survey
        </div>
        <div className="configform">
          <div className="config-header">Set up Configuration</div>
          <div className="config-body">
            <label>
              Choose How much time to wait before showing the suvery
            </label>
            <div className="d-flex">
              <div className="btngrp">
                <KeyboardArrowLeftOutlinedIcon fontSize="small" />
                <input className="custom-input" />
                <KeyboardArrowRightOutlinedIcon fontSize="small" />
              </div>
              seconds
            </div>
            <label>
            choose how much time to wait before showing the survey
            </label>
            <div className="d-flex">
              <div className="btngrp">
                <KeyboardArrowLeftOutlinedIcon fontSize="small" />
                <input className="custom-input" />
                <KeyboardArrowRightOutlinedIcon fontSize="small" />
              </div>
              times
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <PopupSurvey
          onClose={() => setShowPopup(false)}
          showPopup={showPopup}
        />
      )}
    </>
  );
}

export default App;
