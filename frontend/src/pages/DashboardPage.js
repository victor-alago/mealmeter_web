import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

function DashboardPage() {
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
        setProfile(response.data.profile_data);  // Adjusted according to the expected response structure
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

  return (
    <MDBContainer className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <MDBCard>
            <MDBCardBody className="text-center">
              <h3>Welcome to Your Dashboard</h3>
              {isLoading && <p>Loading your profile...</p>}
              {!isLoading && error && <p className="text-danger">{error}</p>}
              {!isLoading && profile && !profile.is_setup && (
                <>
                  <p className="mb-4">Get the most out of our service by completing your profile setup.</p>
                  <MDBBtn onClick={handleCompleteSetup} color="info">
                    Complete Setting Up Your Profile
                  </MDBBtn>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default DashboardPage;