import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import "../assets/css/LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setMessage('');  // Clear any existing messages

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password
      });
      console.log(response.data); // Use this data to manage user session
      navigate('/dashboard'); // Navigate to another route upon successful login
      setMessage('Login successful');
      setMessageType('success');
    } catch (error) {
      if (error.response) {
        // Log the detailed error for developers
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        
        // Determine user-friendly message based on error response
        const userMessage = determineUserMessage(error.response.data);
        setMessage(userMessage);
        setMessageType('error');
      } else if (error.request) {
        // Log the error details and show a generic error message
        console.error("No response received:", error.request);
        setMessage('Unable to connect to the server. Please check your internet connection.');
        setMessageType('error');
      } else {
        // Log unexpected errors and show a generic error message
        console.error('Unexpected error:', error.message);
        setMessage('An unexpected error occurred. Please try again.');
        setMessageType('error');
      }
    }
  };

    // Helper function to determine a user-friendly message
    function determineUserMessage(errorData) {
    switch (errorData.error) {
        case 'INVALID_EMAIL':
        return 'The email address is invalid. Please enter a valid email.';
        case 'USER_DISABLED':
        return 'This account has been disabled. Please contact support.';
        case 'USER_NOT_FOUND':
        return 'No account found with this email. Please sign up.';
        case 'INVALID_PASSWORD':
        return 'Incorrect password. Please try again.';
        default:
        return 'Failed to log in. Please check your credentials and try again.';
    }
    }


  return (
    <MDBContainer fluid className='my-5' style={{width: '60%'}}>
      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>
          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)', backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>
              <h2 className="fw-bold mb-5">Sign in now</h2>
              <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <MDBBtn type="submit" className='w-100 mb-4' size='md' style={{backgroundColor: '#2fd9ff', color: '#000000'}}>sign in</MDBBtn>
                <div className={`alert ${messageType === 'error' ? 'text-danger' : 'text-success'}`}>{message}</div>
              </form>
              <div className="text-center">
                <p>or sign in with:</p>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#2fd9ff' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#2fd9ff' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#2fd9ff' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#2fd9ff' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>
                <p>Dont have an account? <Link to="/signup" className="">Sign up</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol col='6'>
          <img src="https://cdn.dribbble.com/users/7367978/screenshots/15992757/media/f8817b795ba90a84529e7e970cd3e5f6.gif"
          style={{height: '500px', width: '500px'}} className="rounded-6 shadow-4"
            alt="" />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginForm;
