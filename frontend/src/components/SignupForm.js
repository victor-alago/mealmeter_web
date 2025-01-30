import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');  // State to store the message
  const [messageType, setMessageType] = useState('');  // State to determine the message type (error or success)
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        setMessageType('error');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/auth/signup', {
            email,
            password
        });
        setMessage('Signup successful, please check your email to verify your account. Redirecting to login page...');
        setMessageType('success');
        console.log(response.data);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            navigate('/login');
        }, 2000);

    } catch (error) {
        if (error.response) {
            console.error("Error data:", error.response.data);
            setMessage('Failed to sign up. ' + (error.response.data.detail || "Error occurred"));
            setMessageType('error');
        } else if (error.request) {
            console.error("Error request:", error.request);
            setMessage('No response received, check your network connection.');
            setMessageType('error');
        } else {
            console.error('Error', error.message);
            setMessage('Error: ' + error.message);
            setMessageType('error');
        }
    }
  };

  return (
    <MDBContainer fluid className='my-5' style={{width: '60%'}}>
      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>
          <MDBCard className='my-5 cascading-right' style={{background: 'hsl(0, 0.00%, 100.00%)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'>
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={handleSignup}>
                <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form5' type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                <MDBBtn type="submit" className='w-100 mb-4' size='md' style={{backgroundColor: '#2fd9ff', color: '#000000'}}>sign up</MDBBtn>
                <div className={`message ${messageType === 'error' ? 'text-danger' : 'text-success'}`}>{message}</div>
              </form>
              <div className="text-center">
                <p>or sign up with:</p>
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
                <p>Already have an account? <Link to="/login" className="">Sign in</Link></p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol col='6'>
          <img src="https://cdn.dribbble.com/users/7367978/screenshots/15992757/media/f8817b795ba90a84529e7e970cd3e5f6.gif"
            style={{height: '500px', width: '500px'}} className="rounded-6 shadow-4"
            alt="Fitness illustration" />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignupForm;
