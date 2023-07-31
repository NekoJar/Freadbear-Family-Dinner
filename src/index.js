import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  const style = {};
  return (
    <header className="header footer">
      <h1 style={style}>Fredbear's Family Diners Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const pizzaLength = pizzas.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {pizzaLength > 0 ? (
        <>
          <p>
            Discover a slice of happiness at Freadbear's Family Dinner Co.,
            where we've crafted a pizza paradise that transcends generations.
            Nestled in the heart of the city, our pizzeria welcomes you with the
            nostalgic charm of a bygone era blended seamlessly with contemporary
            comforts.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p> - - Maintenace is in progress - - </p>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price + 3}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 9;
  const closeHour = 23;
  const isOpen = openHour <= hour && hour < closeHour;
  const time = new Date().toLocaleTimeString(undefined, { hour12: false });
  const [getTime, setTime] = useState(time);
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date().toLocaleTimeString(undefined, { hour12: false }));
    }, 1000);
    return () => clearInterval(intervalID);
  });

  return (
    <footer className="footer">
      {isOpen ? (
        <Order getTime={getTime} />
      ) : (
        <p>{getTime}. Sorry we're currently closed. Come back later or order</p>
      )}
    </footer>
  );
}

function Order({ getTime }) {
  return (
    <div className="order">
      <p>{getTime}. We're currently Open! Come visit us or order online.</p>
      <button className="btn">Order Now</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
