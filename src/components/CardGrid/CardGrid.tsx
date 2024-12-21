import React from "react";
import Card, { CardProps } from "../Card/Card.tsx";
import "./CardGrid.css";

const cardsData: Array<CardProps> = [
    {
        image: "/path/to/image1.jpg",
        title: "Group Classes",
        subtitle: "Have fun while learning",
        description: "Join one of our group classes, you don't need a partner!",
    },
    {
        image: "/path/to/image2.jpg",
        title: "Privates",
        subtitle: "Struggling on a difficult pattern? We got you! Sign up for a private",
        description: "We offer privates in our studios or your home (for a slightly higher price)",
    },
    {
        image: "/path/to/image3.jpg",
        title: "Loyalty Program",
        subtitle: "Earn points overtime by joining our awesome loyalty program",
        description: "Discounts, Free merch, and even privates by earning points",
    },
    {
        image: "/path",
        title: "Events!",
        subtitle: "Socials, Parties, Community Get togethers",
        description: "Have fun, meet new people, and even possibly get hitched"
    }
];

const CardGrid = () => {
    return (
        <div className="card-grid">
            {cardsData.map((card, index) => (
                <Card
                    image={card.image}
                    title={card.title}
                    subtitle={card.subtitle}
                    description={card.description}
                />
            ))}
        </div>
    );
};

export default CardGrid;
