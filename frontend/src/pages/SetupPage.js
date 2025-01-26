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
        health_metrics: {
            medical_conditions: [],
            medications: []
        }
    });

    const navigate = useNavigate();

    const handleNext = () => {
        let canProceed = false;
        switch (step) {
            case 1:
                canProceed = formData.gender && formData.birthdate; // Ensuring these fields are not empty.
                break;
            case 2:
                canProceed = formData.height_cm && formData.weight_kg; // Ensuring these fields are not empty.
                break;
            case 3:
                canProceed = formData.activity_level && formData.goal; // Ensuring these fields are not empty.
                break;
            case 4:
                // Check if either the fields have values or "None" is selected.
                canProceed = formData.diet_type && (
                    formData.food_preferences_none ||
                    formData.allergies_none ||
                    formData.health_metrics.medical_conditions_none ||
                    formData.health_metrics.medications_none ||
                    formData.food_preferences.length > 0 ||
                    formData.allergies.length > 0 ||
                    formData.health_metrics.medical_conditions.length > 0 ||
                    formData.health_metrics.medications.length > 0
                );
                break;
            default:
                canProceed = false;
        }
    
        if (canProceed) {
            if (step < 4) setStep(step + 1);
            else submitForm(); // Proceed to submit if all validations are passed.
        } else {
            alert("Please fill all required fields before proceeding.");
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['food_preferences', 'allergies'].includes(name)) {
            setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()).filter(item => item !== '') });
        } else if (['medical_conditions', 'medications'].includes(name)) {
            setFormData({
                ...formData,
                health_metrics: {
                    ...formData.health_metrics,
                    [name]: value.split(',').map(item => item.trim()).filter(item => item !== '')
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleToggleNone = (field) => {
        // Toggle handling for fields directly on formData
        if (['food_preferences', 'allergies'].includes(field)) {
            setFormData({
                ...formData,
                [`${field}_none`]: !formData[`${field}_none`],
                [field]: []
            });
        } else { // Toggle handling for fields nested under health_metrics
            setFormData({
                ...formData,
                health_metrics: {
                    ...formData.health_metrics,
                    [`${field}_none`]: !formData.health_metrics[`${field}_none`],
                    [field]: []
                }
            });
        }
    };

    const submitForm = async () => {
        const preparedData = {
            gender: formData.gender,
            birthdate: formData.birthdate.toISOString().split('T')[0], // Format as YYYY-MM-DD
            height_cm: parseFloat(formData.height_cm), // Convert string to number
            weight_kg: parseFloat(formData.weight_kg),
            activity_level: formData.activity_level,
            goal: formData.goal,
            diet_type: formData.diet_type,
            food_preferences: formData.food_preferences_none ? [] : formData.food_preferences,
            allergies: formData.allergies_none ? [] : formData.allergies,
            medical_conditions: formData.health_metrics.medical_conditions_none ? [] : formData.health_metrics.medical_conditions,
            medications: formData.health_metrics.medications_none ? [] : formData.health_metrics.medications,
        };
    
        // Conditionally adding target weight and weekly goal weight
        if (formData.goal !== 'weight maintenance') {
            preparedData.target_weight = formData.target_weight;
            preparedData.weekly_goal_kg = formData.weekly_goal_kg;
        }

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
            {step === 4 && <FourthStep formData={formData} setFormData={setFormData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack} handleToggleNone={handleToggleNone} />}
        </div>
    );
}

export default SetupPage;