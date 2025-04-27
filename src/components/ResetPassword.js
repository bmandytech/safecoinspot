import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [tokenValid, setTokenValid] = useState(true);
    const location = useLocation();
    const history = useHistory();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (!token) {
            setTokenValid(false);
            setMessage('Invalid or expired token.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/reset-password', { token, newPassword });
            setMessage(response.data.message);
            setTimeout(() => {
                history.push('/login');
            }, 2000);
        } catch (error) {
            setMessage('Error: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {tokenValid ? (
                <form onSubmit={handleSubmit}>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <p>{message}</p>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;