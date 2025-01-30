import React, { useState } from 'react';
import styles from '../assets/css/Calendar.module.css';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const MealContainer = ({ meals }) => {
    const [openMeal, setOpenMeal] = useState('');

    const toggleMeal = (mealType) => {
        setOpenMeal(openMeal === mealType ? '' : mealType);
    };

    // Map meal types to specific card classes
    const mealCardClasses = {
        breakfast: styles.breakfastCard,
        lunch: styles.lunchCard,
        dinner: styles.dinnerCard,
        snacks: styles.snacksCard,
        drinks: styles.drinksCard,
    };

    return (
        <div className={styles.mealContainer}>
            {Object.keys(meals).map((mealType) => {
                const isMealOpen = openMeal === mealType;
                const totalMealCalories = meals[mealType].reduce((sum, item) => sum + item.calories, 0);

                return (
                    <div
                        key={mealType}
                        className={`${styles.mealCard} ${mealCardClasses[mealType]}`}
                        onClick={() => toggleMeal(mealType)}
                    >
                        <div className={styles.mealHeader}>
                            <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
                            <p>{totalMealCalories} kcal</p>
                            {isMealOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                        {isMealOpen && (
                            <div className={styles.mealDetails}>
                                {meals[mealType].map((food, index) => (
                                    <div key={index} className={styles.foodEntry}>
                                        <span>{food.food_name} - {food.calories} kcal</span>
                                        <span>Serving size: {food.serving_size}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MealContainer;