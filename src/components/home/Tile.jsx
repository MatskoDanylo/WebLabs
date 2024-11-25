import React from 'react';
import './Tile.css';

export default function Tile({ imgSrc, title, description }) {
    return (
        <div className="tile">
            <img src={imgSrc} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
