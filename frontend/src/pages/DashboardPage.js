import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiChevronsRight } from "react-icons/fi"; // Importing Chevron Right Icon
import styles from '../assets/css/DashboardPage.module.css';
import NavbarHome from '../components/NavbarHome';
import useAuth from '../hooks/useAuth';
import Calendar from '../components/Calendar';
import Footer from '../components/Footer';

function DashboardPage() {
  useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data.profile_data); // Adjusted according to the expected response structure
        setError(''); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to fetch profile. Please try again.');
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleCompleteSetup = () => {
    navigate('/setup');
  };

  const profileComplete = profile && profile.is_setup;

  return (
    <>
      <div className="parentContainer">
        <NavbarHome />
          <div className={styles.container}>
            {isLoading && <p>Loading your profile...</p>}
            {!isLoading && error && <p className={styles.error}>{error}</p>}
            {!isLoading && profile && !profile.is_setup && (
              <button onClick={handleCompleteSetup} className={styles.actionButton}>
                Complete your profile setup now to unlock personalized meal tracking and tailored nutrition insights
                <FiChevronsRight className={styles.icon} />
              </button>
            )}
            <br />
          </div>
        <Calendar profileComplete={profileComplete} />
      </div>
      <div>
          <Footer />
      </div>
    </>
  );
}

export default DashboardPage;