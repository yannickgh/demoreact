import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import "./style.css";
import { Card } from "./Card";
import { Periode } from "./Periode";

let MAX_PAGES = 10;

const Loader = () => {
  return <div className="loader"></div>;
};

const Article = ({ children, reference }) => {
  return (
    <article className="articleContainer" ref={reference}>
      {children}
    </article>
  );
};

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(0);
  const observer = useRef(); // ???

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (pages < MAX_PAGES) {
            getArticles(pages);
            setPages((pages) => pages + 1);
          } else {
            setHasMore(false);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    getArticles(pages);
    setPages((pages) => pages + 1);
  }, []); // TRES IMPORTANT

  const getArticles = async (page) => {
    setIsLoading(true);
    await fetch(`https://warm-taiga-19057.herokuapp.com/api/articles/?page=${page}&size=4`)
    // https://dashboard.heroku.com/apps/warm-taiga-19057/
    // warm-taiga-19057.herokuapp.com:4474/api/articles/?page=${page}&size=4
      .then((res) => res.json())
      .then((res) => {
        MAX_PAGES = +res.totalPages;
        setArticles([...articles, ...res.articles]);
        setIsLoading(false);
      });
  };

  let currentDay = 0;
  let currentMonth = 0;

  return (
    <section className="cards">
      {articles.map((article, index) => {
        if (index + 1 === articles.length) {
          if (article.m > currentMonth) {
            currentMonth = article.m;
            currentDay = article.d;
            return (
              <>
                <Periode date={getDate(article)} />
                <Article reference={lastItemRef} key={index}>
                  <Card article={article}></Card>
                </Article>
              </>
            );
          } else if (article.d > currentDay) {
            currentDay = article.d;
            return (
              <>
                <Periode date={getDate(article)} />
                <Article reference={lastItemRef} key={index}>
                  <Card article={article}></Card>
                </Article>
              </>
            );
          } else {
            return (
              <Article reference={lastItemRef} key={index}>
                <Card article={article}></Card>
              </Article>
            );
          }
        } else {
          if (article.m > currentMonth) {
            currentMonth = article.m;
            currentDay = article.d;
            return (
              <>
                <Periode date={getDate(article)} />
                <Article key={index}>
                  <Card article={article}></Card>
                </Article>
              </>
            );
          } else if (article.d > currentDay) {
            currentDay = article.d;
            return (
              <>
                <Periode date={getDate(article)} />
                <Article key={index}>
                  <Card article={article}></Card>
                </Article>
              </>
            );
          } else {
            return (
              <Article key={index}>
                <Card article={article}></Card>
              </Article>
            );
          }
        }
      })}
      {isLoading && <Loader />}
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
const getDate = (item) => {
  return `${item.d} ${getMonth(item.m)} ${item.a}`;
};

export default App;
