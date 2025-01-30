import React from 'react';
import styles from '../assets/css/Calendar.module.css'; // Make sure to create this CSS file and import it

const MealContainer = ({ meals }) => {
  // Get the meal types (keys of the meals object)
  const mealTypes = Object.keys(meals);

  return (
    <div className={styles.mealContainer}>
      {mealTypes.map((mealType) => {
        // Calculate total calories for each meal type
        const totalMealCalories = meals[mealType].reduce((sum, item) => sum + item.calories, 0);
        return (
          <div key={mealType} className={styles.mealCard}>
            <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3> {/* Capitalize the meal type */}
            <p>{totalMealCalories} kcal</p> {/* Display total calories */}
          </div>
        );
      })}
    </div>
  );
};

export default MealContainer;