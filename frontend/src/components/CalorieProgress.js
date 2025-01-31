import React, { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from "../assets/css/Calendar.module.css";
import { MdOutlineFitnessCenter } from 'react-icons/md'; // Icon for the target
import { FaBurn } from 'react-icons/fa'; // Icon for the total calories
import Confetti from 'react-confetti';

function CalorieProgress({ totalCalories, targetCalories }) {
  const percentage = Math.min(100, (totalCalories / targetCalories) * 100);
  const remainingCalories = Math.max(0, targetCalories - totalCalories);
  const goalMet = totalCalories >= targetCalories; // Check if goal is met
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (goalMet) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 10000); // Confetti will disappear after 5000ms (5 seconds)
      return () => clearTimeout(timer);
    }
  }, [goalMet]);

  return (
    <div className={styles.calorieProgressContainer}>
      {showConfetti && <Confetti />}
      <div className={styles.progressBarContainer}>
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            pathColor: goalMet ? '#4CAF50' : '#FF6347', // Green when goal is met, otherwise Tomato Red
            textColor: '#000000',
            trailColor: '#b8bab9',
            backgroundColor: '#FFFFFF',
          })}
        >
          <div style={{ fontSize: '40px', marginTop: '-5px' }}>
            <strong>{remainingCalories}</strong>
          </div>
          <div style={{ fontSize: '20px', color: '#666' }}>
            {goalMet ? "Goal achieved!" : "remaining"}
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
          <FaBurn size={30} className={styles.icon} color={goalMet ? '#4CAF50' : '#FF6347'} />
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