import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiChevronsRight, FiEdit, FiSave, FiX } from "react-icons/fi";
import styles from '../assets/css/ProfilePage.module.css';
import NavbarHome from '../components/NavbarHome';
import useAuth from '../hooks/useAuth';

function ProfilePage() {
    useAuth();
    const [profile, setProfile] = useState({});
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(response.data.profile_data);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to fetch profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleCompleteSetup = () => {
        navigate('/setup');
    };

    const handleEdit = (field) => {
        setEditField(field);
        setEditValue(profile[field] || '');
    };

    const handleSave = async () => {
        const updatedProfile = { ...profile, [editField]: editValue };
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8000/users/profile', updatedProfile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProfile(updatedProfile);
            setEditField(null);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setError('Failed to update profile.');
        }
    };

    const handleCancel = () => {
        setEditField(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <NavbarHome />
            <div className={styles.profileContainer}>
                <h1>Profile Information</h1>
                {!profile.is_setup ? (
                    <button onClick={handleCompleteSetup} className={styles.actionButton}>
                        Complete your profile setup to be able to see your detailed information
                        <FiChevronsRight className={styles.icon} />
                    </button>
                ) : (
                    profile && Object.keys(profile).length > 0 && ['gender', 'birthdate', 'height_cm', 'weight_kg', 'activity_level', 'goal', 'target_weight', 'weekly_goal_kg', 'diet_type', 'food_preferences', 'allergies', 'medical_conditions'].map((key) => (
                        <div key={key} className={styles.profileItem}>
                            <strong>{key.replace('_', ' ')}:</strong>
                            {editField === key ? (
                                <>
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className={styles.inputField}
                                    />
                                    <button onClick={handleSave} className={styles.actionButton}><FiSave /></button>
                                    <button onClick={handleCancel} className={styles.actionButton}><FiX /></button>
                                </>
                            ) : (
                                <>
                                    {profile[key] ? profile[key].toString() : 'Not set'}
                                    <button onClick={() => handleEdit(key)} className={styles.editButton}>
                                        <FiEdit />
                                    </button>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProfilePage;