import React from 'react';
import './Heading.css';

export default function Heading({ imgSrc, title, description }) {
    return (
        <div className="text-content">
            <img src={imgSrc} alt={title} />
            <div className="text">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}
