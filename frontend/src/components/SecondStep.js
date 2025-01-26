import React from 'react';
import styles from '../assets/css/SecondStep.module.css';

function SecondStep({ formData, handleChange, handleNext, handleBack }) {
    const handleActivityLevelChange = (level) => {
        handleChange({ target: { name: 'activity_level', value: level } });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.stepTitle}>Step 2: Physical Details</h2>

            <div className={styles.formGroup}>
                <label className={styles.label}>Height (cm):</label>
                <input
                    type="number"
                    name="height_cm"
                    value={formData.height_cm}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Weight (kg):</label>
                <input
                    type="number"
                    name="weight_kg"
                    value={formData.weight_kg}
                    onChange={handleChange}
                    className={styles.inputField}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Activity Level:</label>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => handleActivityLevelChange('sedentary')}
                        className={`${styles.activityButton} ${formData.activity_level === 'sedentary' ? styles.selected : ''}`}
                    >
                        Sedentary
                    </button>
                    <button
                        type="button"
                        onClick={() => handleActivityLevelChange('lightly active')}
                        className={`${styles.activityButton} ${formData.activity_level === 'lightly active' ? styles.selected : ''}`}
                    >
                        Lightly Active
                    </button>
                    <button
                        type="button"
                        onClick={() => handleActivityLevelChange('moderately active')}
                        className={`${styles.activityButton} ${formData.activity_level === 'moderately active' ? styles.selected : ''}`}
                    >
                        Moderately Active
                    </button>
                    <button
                        type="button"
                        onClick={() => handleActivityLevelChange('very active')}
                        className={`${styles.activityButton} ${formData.activity_level === 'very active' ? styles.selected : ''}`}
                    >
                        Very Active
                    </button>
                    <button
                        type="button"
                        onClick={() => handleActivityLevelChange('extra active')}
                        className={`${styles.activityButton} ${formData.activity_level === 'extra active' ? styles.selected : ''}`}
                    >
                        Extra Active
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

export default SecondStep;