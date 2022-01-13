import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import "./style.css";
import { Article } from "./Article";
import { Periode } from "./Periode";

let MAX_PAGES = 10;

const Loader = () => {
  return <div className="loader"></div>;
};

const test = () => {
  console.log("ok")
}

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pages, setPages] = useState(0);
  const observer = useRef();

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
    await fetch(
      // `https://warm-taiga-19057.herokuapp.com/api/articles/?page=${page}&size=4`
      `http://localhost:8080/api/articles/?page=${page}&size=4`
    )
      .then((res) => res.json())
      .then((res) => {
        MAX_PAGES = +res.totalPages;
        if (+res.totalPages === +res.currentPage + 1) {
          setHasMore(false);
        }
        setArticles([...articles, ...res.articles]);
        setIsLoading(false);
      });
  };

  let first = true;
  let currentI = 0;
  let listSections = Object.values(
    articles.reduce((acc, item) => {
      acc[item.i] = [...(acc[item.i] || []), item];
      return acc;
    }, {})
  );

  return (
    <>
      {listSections.map((section, indexSection) => {
        // article.i croissant quand il change, nouvelle section
        let lastSection = indexSection + 1 === listSections.length;
        return (
          <section className="cards" key={indexSection}>
            {section.map((article, indexArticle) => {
              let lastArticle = indexArticle + 1 === section.length;
              let nouvelleSection = false;
              if (first) {
                first = false;
                currentI = article.i;
                nouvelleSection = true;
              } else {
                if (article.i > currentI) {
                  currentI = article.i;
                  nouvelleSection = true;
                }
              }
              if (hasMore && lastSection && lastArticle) {
                if (nouvelleSection) {
                  return (
                    <>
                      <Periode date={getDate(article)} />
                      <Article reference={lastItemRef} article={article} key={indexArticle} click={test} />
                    </>
                  );
                } else {
                  return (
                    <Article reference={lastItemRef} article={article} key={indexArticle} click={test} />
                  );
                }
              } else {
                if (nouvelleSection) {
                  return (
                    <>
                      <Periode date={getDate(article)} />
                      <Article article={article} key={indexArticle} click={test} />
                    </>
                  );
                } else {
                  return (
                    <Article article={article} key={indexArticle} click={test} />
                  );
                }
              }
            })}
          </section>
        );
      })}
      {isLoading && <Loader />}
    </>
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
