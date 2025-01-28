import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import styles from '../assets/css/ProfilePage.module.css';
import NavbarHome from '../components/NavbarHome';
import useAuth from '../hooks/useAuth';

function ProfilePage() {
    useAuth();
    const [profile, setProfile] = useState(null);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
    const [activeTab, setActiveTab] = useState('personal_information'); // Default active tab
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, [navigate]);

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
            setProfile(response.data.profile_data || {});
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError('Failed to fetch profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (field) => {
        setEditField(field);
        setEditValue(profile[field] || '');
    };

    const handleSave = async () => {
        const updatedProfile = { ...profile, [editField]: editValue };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:8000/users/profile', updatedProfile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                fetchProfile();
                setEditField(null);
                setError('');
            } else {
                throw new Error('Update failed: ' + response.status);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            setError('Failed to update profile. ' + (error.response?.data?.detail || 'An error occurred'));
        }
    };

    const handlePasswordUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/auth/update-password', {
                old_password: passwords.oldPassword,
                new_password: passwords.newPassword,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data) {
                alert('Password updated successfully');
                setPasswords({ oldPassword: '', newPassword: '' });
            }
        } catch (error) {
            console.error('Failed to update password:', error);
            setError('Failed to update password. ' + (error.response?.data?.detail || 'An error occurred'));
        }
    };

    const handleCancel = () => {
        setEditField(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!profile) return <div>No profile data available.</div>;

    const profileSections = {
        personal_information: ['gender', 'birthdate', 'email'],
        physical_details: ['height_cm', 'weight_kg'],
        your_goal: ['goal', 'target_weight', 'weekly_goal_kg'],
        health_and_lifestyle: ['diet_type', 'food_preferences', 'allergies', 'medical_conditions', 'medications']
    };

    return (
        <div>
            <NavbarHome />
            <div className={styles.profileContainer}>
                <h1>Profile Information</h1>

                <div className={styles.tabHeaders}>
                    {Object.keys(profileSections).map((section, index) => (
                        <button
                            key={section}
                            className={`${styles.tabButton} ${
                                activeTab === section ? styles.active : ''
                            }`}
                            onClick={() => setActiveTab(section)}
                        >
                            {section.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </button>
                    ))}
                    <div
                        className={styles.underline}
                        style={{
                            '--active-index': Object.keys(profileSections).indexOf(activeTab),
                        }}
                    />
                </div>

                <div className={styles.tabContent}>
                    {Object.entries(profileSections)
                        .filter(([section, _]) => section === activeTab)
                        .map(([section, fields]) => (
                            <div key={section} className={styles.swipeContent}>
                                {fields.map(
                                    (field) =>
                                        profile[field] !== undefined &&
                                        (field !== 'weekly_goal_kg' || profile.goal !== 'weight maintenance') && (
                                            <div key={field} className={styles.profileItem}>
                                                <strong>{field.replace('_', ' ')}:</strong>
                                                {editField === field ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={editValue}
                                                            onChange={(e) => setEditValue(e.target.value)}
                                                            className={styles.inputField}
                                                        />
                                                        <button onClick={handleSave} className={styles.actionButton}>
                                                            <FiSave />
                                                        </button>
                                                        <button onClick={handleCancel} className={styles.actionButton}>
                                                            <FiX />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {profile[field].toString()}
                                                        <button onClick={() => handleEdit(field)} className={styles.editButton}>
                                                            <FiEdit />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )
                                )}
                                {section === 'personal_information' && (
                                    <div className={styles.profileItem}>
                                        <strong>Update Password:</strong>
                                        <input
                                            type="password"
                                            value={passwords.oldPassword}
                                            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                            placeholder="Old Password"
                                            className={styles.inputField}
                                        />
                                        <input
                                            type="password"
                                            value={passwords.newPassword}
                                            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                            placeholder="New Password"
                                            className={styles.inputField}
                                        />
                                        <button onClick={handlePasswordUpdate} className={styles.actionButton}>
                                            Update
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;