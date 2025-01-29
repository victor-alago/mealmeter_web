import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../assets/css/ProfilePage.module.css';
import NavbarHome from '../components/NavbarHome';
import useAuth from '../hooks/useAuth';
import ProfileTabs from '../components/ProfileTabs';

function ProfilePage() {
    useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
    const [activeTab, setActiveTab] = useState('personal_information');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProfile();
    }, [navigate]);

    useEffect(() => {
        if (profile && profile.goal === 'weight maintenance') {
            setProfile(prev => ({ ...prev, weekly_goal_kg: 0 }));
        }
    }, [profile?.goal]);

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
        if (editField === 'goal' && editValue !== 'weight maintenance') {
            updatedProfile.weekly_goal_kg = ''; // Reset weekly goal kg if goal changes away from maintenance
        }
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!profile) return <div>No profile data available.</div>;

    return (
        <div>
            <NavbarHome />
            <div className={styles.profileContainer}>
                <h1>Profile Information</h1>
                <ProfileTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    profileSections={{
                        personal_information: ['gender', 'birthdate', 'email'],
                        physical_details: ['height_cm', 'weight_kg'],
                        your_goal: ['goal', 'target_weight', ...(profile.goal !== 'weight maintenance' ? ['weekly_goal_kg'] : [])],
                        health_and_lifestyle: ['diet_type', 'food_preferences', 'allergies', 'medical_conditions', 'medications']
                    }}
                    profile={profile}
                    editField={editField}
                    setEditField={setEditField}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    handleSave={handleSave}
                    handleCancel={() => setEditField(null)}
                    passwords={passwords}
                    setPasswords={setPasswords}
                    handlePasswordUpdate={() => { /* password update logic */ }}
                />
            </div>
        </div>
    );
}

export default ProfilePage;