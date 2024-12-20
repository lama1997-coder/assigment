import InputText from "../components/InputText.jsx"
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const [errorMessage, setErrorMessage] = useState('');


    const handleRegistration = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error

        // Basic validation
        if (!email || !password) {
            setErrorMessage('Both email and password are required.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', { email, password });

            // Save JWT token to localStorage
            localStorage.setItem('token', response.data.message);

            // Redirect to a dashboard or home page
            alert('Register successful');
            window.location.href = '/login'; // Change this path as needed
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    }

    return (
        <div className="main">
            <div className="login-container">
                <h1 >Register New User!</h1>
                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                <form onSubmit={handleRegistration}>
                    <InputText placeholder='Email' label='Email:' onChange={handleEmailChange} value={email} />
                    <InputText placeholder='Password' label='Password:' type="password" onChange={handlePasswordChange} value={password} />
                    <button type="submit" style={styles.button} >Login</button>

                </form>
            </div>
            <div style={{
                backgroundImage: 'url(./logo.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',  // Center the background image
            }}></div>
        </div>
    )

}
const styles = {
    errorMessage: {
        color: 'red',
        marginBottom: '15px',

    },
    button: {
        backgroundColor: '#656ED3',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
}