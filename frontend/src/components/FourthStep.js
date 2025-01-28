import React from 'react';
import styles from "../assets/css/FourthStep.module.css";

function FourthStep({ formData, setFormData, handleNext, handleBack }) {
    const handleInputChange = (field, value) => {
        // Validate the input for a list of strings separated by commas
        const isValidInput = value.split(',').every(item => /^[a-zA-Z\s]*$/.test(item.trim()));
        if (!isValidInput) {
            alert('Please enter valid inputs separated by commas. Only alphabetic characters and spaces are allowed.');
            return;
        }
        setFormData({
            ...formData,
            [field]: value.split(',').map(item => item.trim())
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.stepTitle}>Step 4: Health and Lifestyle</h2>

            {/* Food Preferences */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Food Preferences:</label>
                <input
                    type="text"
                    name="food_preferences"
                    value={formData.food_preferences.join(', ')}
                    onChange={(e) => handleInputChange('food_preferences', e.target.value)}
                    className={styles.inputField}
                />
            </div>

            {/* Allergies */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Allergies:</label>
                <input
                    type="text"
                    name="allergies"
                    value={formData.allergies.join(', ')}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    className={styles.inputField}
                />
            </div>

            {/* Medical Conditions */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Medical Conditions:</label>
                <input
                    type="text"
                    name="medical_conditions"
                    value={formData.medical_conditions.join(', ')}
                    onChange={(e) => handleInputChange('medical_conditions', e.target.value)}
                    className={styles.inputField}
                />
            </div>

            {/* Medications */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Medications:</label>
                <input
                    type="text"
                    name="medications"
                    value={formData.medications.join(', ')}
                    onChange={(e) => handleInputChange('medications', e.target.value)}
                    className={styles.inputField}
                />
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