import React from "react";

const CoffeeCard = ({ name, rating, imageUrl }) => {
  return (
    <div style={{ display: "flex", boxShadow: " inset 0px 0px 15px rgba(0, 0, 0, 0.5)", borderRadius: "20px", padding: "20px", margin: "50px", backgroundColor: "#F2F3F5" }}>
      <img src={imageUrl} alt={name} style={{ width: "250px", height: "250px", objectFit: "cover", borderRadius: "20px" }} />
      <div style={{ marginLeft: "30px" }}>
        <h1>{name}</h1>
        <h3>Rating: {rating}</h3>
      </div>
    </div>
  );
};

export default CoffeeCard;
