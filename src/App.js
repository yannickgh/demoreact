import React, { useState } from "react";
import "./App.css";
import { Card } from "./Card";
import { Periode } from "./Periode";

function App() {
  const [items, setItems] = useState([]);

  const getArticles = async () => {
    await fetch(`./assets/data/articles.json`)
      .then((res) => res.json())
      .then((res) => setItems(res));
  };

  React.useEffect(() => {
    getArticles();
  }, []);

  let currentDay = 0;
  let currentMonth = 0;

  return (
    <section className="cards">
      {items.map((item, index) => {
        console.log(JSON.stringify(item));
        if (item.m > currentMonth) {
          currentMonth = item.m;
          currentDay = item.d;
          return (
            <>
              <Periode date={getDate(item)} />
              <Card index={index} item={item} />
            </>
          );
        } else if (item.d > currentDay) {
          currentDay = item.d;
          return (
            <>
              <Periode date={getDate(item)} />
              <Card index={index} item={item} />
            </>
          );
        }
        return <Card index={index} item={item} />;
      })}
    </section>
  );
}

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const getMonth = (m) => {
  return monthNames[m - 1];
};
const getDate=(item)=>{
  return `${item.d} ${getMonth(item.m)} ${item.a}`;
}

export default App;
