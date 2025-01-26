import React from 'react';
import styles from "../assets/css/ThirdStep.module.css";

function ThirdStep({ formData, handleChange, handleNext, handleBack }) {
    // Custom function to handle button clicks for goal and dietary preference
    const handleGoalChange = (goal) => {
        handleChange({ target: { name: 'goal', value: goal } });
    };

    const handleDietChange = (diet) => {
        handleChange({ target: { name: 'diet_type', value: diet } });
    };

    const isMaintenance = formData.goal === 'weight maintenance';

    return (
        <div className={styles.container}>
            <h2 className={styles.stepTitle}>Step 3: Health Goals</h2>

            <div className={styles.formGroup}>
                <label className={styles.label}>Goal Type:</label>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => handleGoalChange('weight loss')}
                        className={`${styles.goalButton} ${formData.goal === 'weight loss' ? styles.selected : ''}`}
                    >
                        Weight Loss
                    </button>
                    <button
                        type="button"
                        onClick={() => handleGoalChange('weight gain')}
                        className={`${styles.goalButton} ${formData.goal === 'weight gain' ? styles.selected : ''}`}
                    >
                        Weight Gain
                    </button>
                    <button
                        type="button"
                        onClick={() => handleGoalChange('weight maintenance')}
                        className={`${styles.goalButton} ${formData.goal === 'weight maintenance' ? styles.selected : ''}`}
                    >
                        Weight Maintenance
                    </button>
                    <button
                        type="button"
                        onClick={() => handleGoalChange('muscle gain')}
                        className={`${styles.goalButton} ${formData.goal === 'muscle gain' ? styles.selected : ''}`}
                    >
                        Muscle Gain
                    </button>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Target Weight (kg):</label>
                <input
                    type="number"
                    name="target_weight"
                    value={formData.target_weight}
                    onChange={handleChange}
                    className={styles.inputField}
                    disabled={isMaintenance}
                    required={!isMaintenance}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Weekly Goal Weight (kg):</label>
                <input
                    type="number"
                    name="weekly_goal_kg"
                    value={formData.weekly_goal_kg}
                    onChange={handleChange}
                    className={styles.inputField}
                    disabled={isMaintenance}
                    required={!isMaintenance}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Dietary Preference:</label>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => handleDietChange('standard')}
                        className={`${styles.dietButton} ${formData.diet_type === 'standard' ? styles.selected : ''}`}
                    >
                        Standard
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDietChange('vegetarian')}
                        className={`${styles.dietButton} ${formData.diet_type === 'vegetarian' ? styles.selected : ''}`}
                    >
                        Vegetarian
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDietChange('vegan')}
                        className={`${styles.dietButton} ${formData.diet_type === 'vegan' ? styles.selected : ''}`}
                    >
                        Vegan
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDietChange('keto')}
                        className={`${styles.dietButton} ${formData.diet_type === 'keto' ? styles.selected : ''}`}
                    >
                        Keto
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDietChange('paleo')}
                        className={`${styles.dietButton} ${formData.diet_type === 'paleo' ? styles.selected : ''}`}
                    >
                        Paleo
                    </button>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <button onClick={handleBack} className={`${styles.navButton} ${styles.previousButton}`}>
                    Previous
                </button>
                <button onClick={handleNext} className={`${styles.navButton} ${styles.nextButton}`}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default ThirdStep;