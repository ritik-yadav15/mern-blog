import React from 'react';
import './AddBlogs/WriteAndUpdate.scss';

function CustomAlert({ message, onClose }) {
    return (
        <div className="custom-alert-overlay">
            <div className="custom-alert">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default CustomAlert;
