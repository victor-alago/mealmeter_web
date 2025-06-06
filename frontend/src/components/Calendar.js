import React, { useState, useEffect } from 'react';
import styles from '../assets/css/Calendar.module.css';
import { FiChevronLeft, FiChevronRight, FiLock } from "react-icons/fi"; // Importing Chevron Icons for navigation
import CalorieProgress from './CalorieProgress';
import MealContainer from './MealContainer';
import axios from 'axios'; 

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Calendar = ({ profileComplete }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [baseDate, setBaseDate] = useState(today);
  const [totalCalories, setTotalCalories] = useState(0);
  const [targetCalories, setTargetCalories] = useState(2000);
  const [isLocked, setIsLocked] = useState(false);
  const [isLockedSetup, setIsLockedSetup] = useState(!profileComplete)
  const [proteinGrams, setProteinGrams] = useState(0);
  const [carbsGrams, setCarbsGrams] = useState(0);
  const [fatsGrams, setFatsGrams] = useState(0);
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
    drinks: []
  });

  useEffect(() => {
    setIsLockedSetup(!profileComplete);
  }, [profileComplete]); 

  const currentMonth = baseDate.getMonth();
  const currentYear = baseDate.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const navigateDays = (direction) => {
    const newDate = new Date(baseDate);
    newDate.setDate(baseDate.getDate() + direction * 7);
    setBaseDate(newDate);
  };

  const selectDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to remove the time part
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0); // Normalize selected date

    if (selectedDate > today) {
        setIsLocked(true);
        setTimeout(() => {
            setIsLocked(false);
        }, 1000); // Lock the UI for 2 seconds
    } else {
        setCurrentDate(date);
        setBaseDate(date);
    }
    };

  const daysToShow = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() - baseDate.getDay() + i);
    return day;
  });

  useEffect(() => {
    const fetchCalories = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/food-log/daily/${currentDate.toISOString().split('T')[0]}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.data) {
            setTotalCalories(response.data.total_calories);
            setTargetCalories(response.data.target_calories);
            setMeals(response.data.meals); // Set the meals data
          }
        } catch (error) {
          console.error('Failed to fetch calorie data:', error);
        }
    };

    fetchCalories();
  }, [currentDate]);


  useEffect(() => {
    const fetchMacros = async () => {
        try {
          const response = await axios.get("http://localhost:8000/insights/nutrition", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          const { protein_grams, carbs_grams, fats_grams } = response.data;
          setProteinGrams(protein_grams);
          setCarbsGrams(carbs_grams);
          setFatsGrams(fats_grams);
        } catch (error) {
          console.error('Failed to fetch calorie data:', error);
        }
    };

    fetchMacros();
  });

  return (
    <div className={styles.parentContainer}>
        <div className={styles.messageContainer}>
            <p>Every meal is a step towards your health goals. Fuel up and stay fit with MealMeter, supporting your active lifestyle every day!</p>
        </div>

        <div className={styles.calendarContainer}>
            <h1 className={styles.trackerHeader}>
                Daily Tracker
            </h1>
            <div className={styles.monthHeader}>
                {monthNames[currentMonth]} {currentYear}
                <div className={styles.navigation}>
                    <button onClick={() => navigateDays(-1)}><FiChevronLeft /></button>
                    <button onClick={() => navigateDays(1)}><FiChevronRight /></button>
                </div>
            </div>
            <div className={styles.header}>
                {daysToShow.map(day => (
                    <div key={day.getDay()} className={styles.dayHeader}>
                        {days[day.getDay()]}
                    </div>
                ))}
            </div>
            <div className={styles.body}>
                {daysToShow.map(day => (
                    <div key={day.toISOString()} className={`${styles.day} ${day.toDateString() === currentDate.toDateString() ? styles.currentDay : ''}`} onClick={() => selectDate(day)}>
                        {day.getDate()}
                    </div>
                ))}
            </div>
            {isLocked && (
                <div className={styles.lockOverlay}>
                    <FiLock size={50} color="#aaa" />
                    <p>Date selection locked for future dates.</p>
                </div>
            )}
            {isLockedSetup && (
                <div className={styles.lockOverlay}>
                    <FiLock size={50} color="#aaa" />
                    <p>Complete your profile to unlock this feature.</p>
                </div>
            )}
            <hr className={styles.divider} />
            <div className={styles.progressAndMeals}>
                <div className={styles.calorieProgress}>
                    <CalorieProgress totalCalories={totalCalories} targetCalories={targetCalories} />
                </div>
                <MealContainer meals={meals} />
            </div>
        </div>

        <div className={styles.insightsContainer}>
            <h1 className={styles.insightsHeader}>
                Insights
            </h1>
            <h3 className={styles.insightsSubheader}>
                Keep up the great work! Remember to consume these daily nutritional targets to stay on track
                with your health goals.
            </h3>
            <div className={styles.macrosContainer}>
                <div className={styles.macroItem} style={{ borderRadius: '10px', backgroundColor: '#f4f4f4' }}>
                    <h3>Protein</h3>
                    <p>{proteinGrams} g</p>
                </div>
                <div className={styles.macroItem} style={{ borderRadius: '10px', backgroundColor: '#f4f4f4' }}>
                    <h3>Carbs</h3>
                    <p>{carbsGrams} g</p>
                </div>
                <div className={styles.macroItem} style={{ borderRadius: '10px', backgroundColor: '#f4f4f4' }}>
                    <h3>Fats</h3>
                    <p>{fatsGrams} g</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Calendar;