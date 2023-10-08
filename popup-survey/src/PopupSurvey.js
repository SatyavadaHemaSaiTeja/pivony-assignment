import React, { useState } from "react";
import "./App.css";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { Button } from "@mui/material";

function PopupSurvey({ onClose, showPopup }) {
  const [selectedRating, setSelectedRating] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleNextClick = () => {
    if (!showComments) {
      setShowComments(true);
    } else {
      console.log("Rating:", selectedRating, "Comment:", comment);
      onClose();
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="popup-container">
        <div className="popup-header">
          <div className="popup-questions">
            {showComments
              ? "If we could do anything - what could it be to wow you?"
              : "How likely are you to recommend pivony to a colleague?"}
          </div>
          <div className="vicon">
            <VerifiedOutlinedIcon fontSize="large" />
          </div>
        </div>

        {showComments ? (
          <div className="text-box-section">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="Please provide additional comments..."
            ></textarea>
          </div>
        ) : (
          <div className="rating-section">
            <div className="ratings">
              {[...Array(10)].map((_, index) => (
                <button
                  key={index}
                  className={`rating-button ${
                    index + 1 <= selectedRating ? "selected" : ""
                  }`}
                  onClick={() => handleRatingClick(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="ratecomments">
              <div>not likely</div>
              <div>very likely</div>
            </div>
          </div>
        )}

        <div className="popup-footer">
          <Button size="small"
            variant="contained"
            className="custom-button"
            endIcon={<KeyboardArrowRightOutlinedIcon />}
            onClick={handleNextClick}
          >
            {showComments ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopupSurvey;
