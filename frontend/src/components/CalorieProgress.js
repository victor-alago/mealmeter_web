import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from "../assets/css/Calendar.module.css";
import { MdOutlineFitnessCenter } from 'react-icons/md'; // Icon for the target
import { FaBurn } from 'react-icons/fa'; // Icon for the total calories

function CalorieProgress({ totalCalories, targetCalories }) {
  const percentage = totalCalories / targetCalories * 100;
  const remainingCalories = targetCalories - totalCalories;

  return (
    <div className={styles.calorieProgressContainer}>
      <div className={styles.progressBarContainer}>
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: `#FF6347`, // Vivid Tomato Red
            textColor: '#000000', // Black for maximum contrast
            trailColor: '#b8bab9', // Very light gray, almost white
            backgroundColor: '#FFFFFF', // White
          })}
        >
          <div style={{ fontSize: '40px', marginTop: '-5px' }}>
            <strong>{remainingCalories}</strong>
          </div>
          <div style={{ fontSize: '20px', color: '#666' }}>
            remaining
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className={styles.caloriesInfo}>
        <div className={styles.goalInfo}>
          <MdOutlineFitnessCenter size={30} className={styles.icon} color="#4682B4" />
          <div>
            <p>Base Goal</p>
            <strong>{targetCalories}</strong>
          </div>
        </div>
        <div className={styles.goalInfo}>
          <FaBurn size={30} className={styles.icon} color="#FF6347" />
          <div>
            <p>Total</p>
            <strong>{totalCalories}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalorieProgress;