import React, { useState } from 'react';
import axios from 'axios';
import NavbarHome from '../components/NavbarHome';
import styles from '../assets/css/LogFoodPage.module.css'; // Import CSS Module

const LogFoodPage = () => {
    const [foodName, setFoodName] = useState('');
    const [mealType, setMealType] = useState('breakfast');
    const [calories, setCalories] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const clearForm = () => {
        setFoodName('');
        setMealType('breakfast');
        setCalories('');
        setServingSize('');
        setDate(new Date().toISOString().split('T')[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authorization token found');
            }

            const response = await axios.post('http://localhost:8000/food-log/entry', {
                food_name: foodName,
                meal_type: mealType,
                calories: parseFloat(calories),
                serving_size: servingSize,
                date: date,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            setMessage(response.data.message);
            setMessageType('success');
            clearForm(); // Clear the form after successful submission

            // Clear the success message after 3 seconds
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 3000);

        } catch (error) {
            console.error('Failed to log food entry:', error);
            setMessage('Failed to log food entry');
            setMessageType('error');
        }
    };

    return (
        <>
            <NavbarHome />
            <div className={styles.container}>
                <h1 className={styles.title}>Log Food</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Food Name:</label>
                        <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Meal Type:</label>
                        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="snacks">Snacks</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Calories:</label>
                        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Serving Size:</label>
                        <input type="text" value={servingSize} onChange={(e) => setServingSize(e.target.value)} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Date:</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <button type="submit" className={styles.submitButton}>Log</button>
                </form>
                {message && (
                    <div className={`${styles.toastMessage} ${messageType === 'error' ? styles.error : styles.success}`}>
                        {message}
                    </div>
                )}
            </div>
        </>
    );
};

export default LogFoodPage;