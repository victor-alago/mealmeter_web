import React from 'react';
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import styles from '../assets/css/ProfilePage.module.css';

const genderOptions = ['male', 'female', 'other'];
const goalOptions = ['weight loss', 'weight gain', 'weight maintenance', 'muscle gain'];
const dietTypeOptions = ['standard', 'vegetarian', 'vegan', 'keto', 'paleo'];

function ProfileTabs({
  activeTab, setActiveTab, profileSections, profile, editField, setEditField, editValue, setEditValue, handleSave, handleCancel, passwords, setPasswords, handlePasswordUpdate
}) {
    const renderEditField = (field) => {
        switch (field) {
            case 'gender':
                return (
                    <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={styles.inputField}
                    >
                        {genderOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'goal':
                return (
                    <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={styles.inputField}
                    >
                        {goalOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'diet_type':
                return (
                    <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={styles.inputField}
                    >
                        {dietTypeOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            default:
                return (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={styles.inputField}
                    />
                );
        }
    };

    return (
        <div>
            <div className={styles.tabHeaders}>
                {Object.keys(profileSections).map((section) => (
                    <button
                        key={section}
                        className={`${styles.tabButton} ${activeTab === section ? styles.active : ''}`}
                        onClick={() => setActiveTab(section)}
                    >
                        {section.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                ))}
                <div
                    className={styles.underline}
                    style={{ '--active-index': Object.keys(profileSections).indexOf(activeTab) }}
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
                                                    {renderEditField(field)}
                                                    <button onClick={handleSave} className={styles.actionButton}>
                                                        <FiSave />
                                                    </button>
                                                    <button onClick={handleCancel} className={styles.actionButton}>
                                                        <FiX />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <span className={styles.profileValue}>{profile[field].toString()}</span>
                                                    {field !== 'email' ? (
                                                        <button onClick={() => setEditField(field)} className={styles.editButton}>
                                                            <FiEdit />
                                                        </button>
                                                    ) : (
                                                        <span className={styles.placeholderButton}></span> // Invisible placeholder for alignment
                                                    )}
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
                                    <button onClick={handlePasswordUpdate} className={styles.actionButton}>Update</button>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ProfileTabs;