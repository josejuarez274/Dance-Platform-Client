import React from "react";
import "./Card.css";

export interface CardProps {
    image: string; // Use string for the image path
    title: string;
    subtitle: string;
    description: string;
}

const Card = ({ image, title, subtitle, description }: CardProps) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt={title} />
            </div>
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <h4 className="card-subtitle">{subtitle}</h4>
                <p className="card-description">{description}</p>
            </div>
        </div>
    );
};

export default Card;
