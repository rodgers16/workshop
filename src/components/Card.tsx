import React from 'react';

export interface CardProps {
    flipped?: boolean;
    type: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Card({ flipped, type, onClick }: CardProps) {
    return <div className={`card ${flipped ? 'flipped' : 'unflipped'}`} onClick={onClick}>
        <div className='card-inner'>
            <div className={`card-back type-${type}`} style={{ 'backgroundImage': `url(./assets/${type}.webp)` }}>
                <span className='card-text'>{type}</span>
            </div>
            <div className='card-front'>
                <img className='card-front-logo' src='./assets/logo.png' />
            </div>
        </div>
    </div>;
}