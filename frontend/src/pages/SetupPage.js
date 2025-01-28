import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import ThirdStep from '../components/ThirdStep';
import FourthStep from '../components/FourthStep';
import axios from 'axios';

function SetupPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        gender: '',
        birthdate: '',
        height_cm: '',
        weight_kg: '',
        activity_level: '',
        goal: '',
        target_weight: '',
        weekly_goal_kg: '',
        diet_type: '',
        food_preferences: [],
        allergies: [],
        medical_conditions: [],
        medications: [],
    });

    const navigate = useNavigate();

    const handleNext = () => {
        let canProceed = false;
        switch (step) {
            case 1:
                canProceed = formData.gender && formData.birthdate;
                break;
            case 2:
                canProceed = formData.height_cm && formData.weight_kg;
                break;
            case 3:
                canProceed = formData.activity_level && formData.goal;
                break;
            case 4:
                canProceed = formData.diet_type && ( // Simplified the checks
                    formData.food_preferences.length > 0 ||
                    formData.allergies.length > 0 ||
                    formData.medical_conditions.length > 0 ||
                    formData.medications.length > 0
                );
                break;
            default:
                canProceed = false;
        }
    
        if (canProceed) {
            if (step < 4) setStep(step + 1);
            else submitForm();
        } else {
            alert("Please fill all required fields before proceeding.");
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitForm = async () => {
        const preparedData = {
            ...formData,
            birthdate: formData.birthdate.toISOString().split('T')[0], // Ensure proper date format
            height_cm: parseFloat(formData.height_cm),
            weight_kg: parseFloat(formData.weight_kg),
            target_weight: parseFloat(formData.target_weight),
            weekly_goal_kg: parseFloat(formData.weekly_goal_kg),
        };

        console.log("Submitting data:", preparedData);
    
        try {
            const response = await axios.post('http://localhost:8000/users/profile', preparedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.status === 201) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Failed to submit profile:', error);
            alert('Failed to submit profile. Please check the data and try again.');
        }
    };

    return (
        <div>
            {step === 1 && <FirstStep formData={formData} setFormData={setFormData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />}
            {step === 2 && <SecondStep formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />}
            {step === 3 && <ThirdStep formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />}
            {step === 4 && <FourthStep formData={formData} setFormData={setFormData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} />}
        </div>
    );
}

export default SetupPage;