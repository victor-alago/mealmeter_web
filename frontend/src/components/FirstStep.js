import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from "../assets/css/FirstStep.module.css";

function FirstStep({ formData, setFormData, handleNext }) {
    const handleDateChange = (date) => {
        setFormData({ ...formData, birthdate: date });
    };

    const handleGenderChange = (gender) => {
        setFormData({ ...formData, gender });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Personalize Your Plan By Giving Us Some Information</h1>
            <h2 className={styles.step}>Step 1: Personal Information</h2>

            <div className={styles.formGroup}>
                <label className={styles.label}>To which gender identity do you most identify?</label>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => handleGenderChange('male')}
                        className={`${styles.genderButton} ${formData.gender === 'male' ? styles.selected : ''}`}
                    >
                        Male
                    </button>
                    <button
                        type="button"
                        onClick={() => handleGenderChange('female')}
                        className={`${styles.genderButton} ${formData.gender === 'female' ? styles.selected : ''}`}
                    >
                        Female
                    </button>
                </div>
            </div>

            <div className={styles.formGroupLeftAligned}>
                <label className={styles.label}>What's your date of birth?</label>
                <DatePicker
                    selected={formData.birthdate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableMonthYearDropdown
                    className={styles.datePicker}
                    placeholderText="Select your date of birth"
                />
            </div>

            <div className={styles.buttonContainer}>
                <button onClick={handleNext} className={styles.nextButton}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default FirstStep;