import React from 'react';
import styles from "../assets/css/FourthStep.module.css";

function FourthStep({ formData, setFormData, handleNext, handleBack }) {
    // Function to toggle the input visibility and reset the fields if needed
    const toggleField = (field, value) => {
        setFormData({
            ...formData,
            [`${field}_none`]: !value,
            [field]: !value ? formData[field] : [] // Clear the field if "No" is selected
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.stepTitle}>Step 4: Health and Lifestyle</h2>

            {/* Food Preferences */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Food Preferences:</label>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => toggleField('food_preferences', true)}
                        className={`${styles.navButton} ${!formData.food_preferences_none ? styles.selected : ''}`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleField('food_preferences', false)}
                        className={`${styles.navButton} ${formData.food_preferences_none ? styles.selected : ''}`}
                    >
                        No
                    </button>
                </div>
                {!formData.food_preferences_none && (
                    <input
                        type="text"
                        name="food_preferences"
                        value={formData.food_preferences.join(', ')}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                food_preferences: e.target.value.split(',').map(item => item.trim())
                            })
                        }
                        className={styles.inputField}
                    />
                )}
            </div>

            {/* Allergies */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Allergies:</label>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => toggleField('allergies', true)}
                        className={`${styles.navButton} ${!formData.allergies_none ? styles.selected : ''}`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleField('allergies', false)}
                        className={`${styles.navButton} ${formData.allergies_none ? styles.selected : ''}`}
                    >
                        No
                    </button>
                </div>
                {!formData.allergies_none && (
                    <input
                        type="text"
                        name="allergies"
                        value={formData.allergies.join(', ')}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                allergies: e.target.value.split(',').map(item => item.trim())
                            })
                        }
                        className={styles.inputField}
                    />
                )}
            </div>

            {/* Medical Conditions */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Medical Conditions:</label>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => toggleField('medical_conditions', true)}
                        className={`${styles.navButton} ${!formData.medical_conditions_none ? styles.selected : ''}`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleField('medical_conditions', false)}
                        className={`${styles.navButton} ${formData.medical_conditions_none ? styles.selected : ''}`}
                    >
                        No
                    </button>
                </div>
                {!formData.medical_conditions_none && (
                    <input
                        type="text"
                        name="medical_conditions"
                        value={formData.health_metrics.medical_conditions.join(', ')}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                health_metrics: {
                                    ...formData.health_metrics,
                                    medical_conditions: e.target.value.split(',').map(item => item.trim())
                                }
                            })
                        }
                        className={styles.inputField}
                    />
                )}
            </div>

            {/* Medications */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Medications:</label>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => toggleField('medications', true)}
                        className={`${styles.navButton} ${!formData.medications_none ? styles.selected : ''}`}
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleField('medications', false)}
                        className={`${styles.navButton} ${formData.medications_none ? styles.selected : ''}`}
                    >
                        No
                    </button>
                </div>
                {!formData.medications_none && (
                    <input
                        type="text"
                        name="medications"
                        value={formData.health_metrics.medications.join(', ')}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                health_metrics: {
                                    ...formData.health_metrics,
                                    medications: e.target.value.split(',').map(item => item.trim())
                                }
                            })
                        }
                        className={styles.inputField}
                    />
                )}
            </div>

            {/* Navigation Buttons */}
            <div className={styles.buttonContainer}>
                <button onClick={handleBack} className={`${styles.navButton} ${styles.previousButton}`}>
                    Previous
                </button>
                <button onClick={handleNext} className={`${styles.navButton} ${styles.nextButton}`}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default FourthStep;