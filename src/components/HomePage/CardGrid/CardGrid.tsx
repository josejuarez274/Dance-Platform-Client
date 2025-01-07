import React from "react";
import Card, { CardProps } from "components/shared/Card/Card";

import "./CardGrid.css";

const cardsData: Array<CardProps> = [
    {
        image: "/assets/group-classes.jpeg",
        title: "Group Classes",
        subtitle: "Have fun while learning",
        description: "Join one of our group classes, you don't need a partner!",
    },
    {
        image: "/assets/privates.jpeg",
        title: "Privates",
        subtitle: "Struggling on a difficult pattern? We got you! Sign up for a private",
        description: "We offer privates in our studios or your home (for a slightly higher price)",
    },
    {
        image: "/assets/loyalty-program-2.jpeg",
        title: "Loyalty Program",
        subtitle: "Earn points overtime by joining our awesome loyalty program",
        description: "Discounts, Free merch, and even privates by earning points",
    },
    {
        image: "/assets/events.jpeg",
        title: "Events",
        subtitle: "Socials, Parties, and More!",
        description: "Meet new people, have fun, and possibly find your new lover"
    }
 ];

const CardGrid = () => {
    return (
        <div>
            <h1 className="card-grid-header">What We Offer (Core Services)</h1>
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
        </div>
    );
};

export default CardGrid;
