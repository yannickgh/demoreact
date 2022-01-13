import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import "./style.css";
import { Card } from "./Card";
import { Periode } from "./Periode";

const Loader = () => {
  return <div className="loader"></div>;
};

const display = (nom) => {
  if (nom.length > 12) return nom.substr(0, 12).toLowerCase() + "…";
  return nom.substr(0, 12).toLowerCase();
};

const Menu = (props) => {
  const [active, setActive] = useState(0); // index active 0, 1, 2, 3
  const [artiste, setArtiste] = useState(-1);
  const [zone, setZone] = useState(-1);
  const [musique, setMusique] = useState(1);

  const [artistes, setArtistes] = useState([]);
  const [zones, setZones] = useState([]);
  const [musiques, setMusiques] = useState([]);

  const artisteNullValue = { select: "ARTISTE" };
  const [artisteSelectedValue, setArtisteSelectedValue] =
    useState(artisteNullValue);

  const zoneNullValue = { select: "ZONE" };
  const [zoneSelectedValue, setZoneSelectedValue] = useState(zoneNullValue);

  const musiqueNullValue = { select: "MUSIQUE" };
  const [musiqueSelectedValue, setMusiqueSelectedValue] =
    useState(musiqueNullValue);

  useEffect(() => {
    loadMenus();
  }, []); // TRES IMPORTANT

  const loadMenus = async () => {
    // await fetch(`http://localhost:8080/api/articles/artistes/`)
    await fetch(`https://warm-taiga-19057.herokuapp.com/api/articles/artistes/`)
      .then((res) => res.json())
      .then((res) => {
        setArtistes([...res]);
      });
    // await fetch(`http://localhost:8080/api/articles/musiques/`)
    await fetch(`https://warm-taiga-19057.herokuapp.com/api/articles/musiques/`)
      .then((res) => res.json())
      .then((res) => {
        setMusiques([...res]);
      });
    // await fetch(`http://localhost:8080/api/articles/zones/`)
    await fetch(`https://warm-taiga-19057.herokuapp.com/api/articles/zones/`)
      .then((res) => res.json())
      .then((res) => {
        setZones([...res]);
      });
  };

  const homeClick = (e) => {
    if (active !== 0) {
      setActive(0);
      setArtiste(-1);
      setMusique(-1);
      setZone(-1);
      setArtisteSelectedValue(artisteNullValue);
      setZoneSelectedValue(zoneNullValue);
      setMusiqueSelectedValue(musiqueNullValue);
      props.setHome(0);
    }
  };

  const artisteChange = (e) => {
    if (e.target.selectedIndex === 0) {
      setArtisteSelectedValue(artisteNullValue);
    } else {
      setActive(1);
      setArtisteSelectedValue({ select: e.target.value });
      setZoneSelectedValue(zoneNullValue);
      setMusiqueSelectedValue(musiqueNullValue);
      props.setArtisteFromMenu(e.target.value);
    }
  };

  const zoneChange = (e) => {
    if (e.target.selectedIndex === 0) {
      setZoneSelectedValue(zoneNullValue);
    } else {
      console.log("zoneChange " + e.target.value);
      setActive(2);
      setArtisteSelectedValue(artisteNullValue);
      setZoneSelectedValue({ select: e.target.value });
      setMusiqueSelectedValue(musiqueNullValue);
      props.setZoneFromMenu(e.target.value);
    }
  };

  const musiqueChange = (e) => {
    if (e.target.selectedIndex === 0) {
      setMusiqueSelectedValue(musiqueNullValue);
    } else {
      setActive(3);
      setArtisteSelectedValue(artisteNullValue);
      setZoneSelectedValue(zoneNullValue);
      setMusiqueSelectedValue({ select: e.target.value });
      props.setMusiqueFromMenu(e.target.value);
    }
  };

  return (
    <div className="menu">
      <div
        key="Pano225"
        className={`item button0 ${active === 0 ? "active" : ""}`}
        onClick={(e) => {
          homeClick(e);
        }}
      >
        Pano225
      </div>
      <div
        key="Artiste"
        className={`item select-artiste ${active === 1 ? "active" : ""}`}
      >
        <select
          value={artisteSelectedValue.select}
          onChange={(e) => artisteChange(e)}
        >
          <option value="ARTISTE">ARTISTE</option>
          {artistes.map((artiste, index) => {
            return <option value={artiste}>{display(artiste)}</option>;
          })}
        </select>
      </div>
      <div
        key="Zone"
        className={`item select-zone ${active === 2 ? "active" : ""}`}
      >
        <select
          value={zoneSelectedValue.select}
          onChange={(e) => zoneChange(e)}
        >
          <option value="ZONE">ZONE</option>
          {zones.map((zone, index) => {
            return <option value={zone}>{display(zone)}</option>;
          })}
        </select>
      </div>
      <div
        key="Musique"
        className={`item select-musique ${active === 3 ? "active" : ""}`}
      >
        <select
          value={musiqueSelectedValue.select}
          onChange={(e) => musiqueChange(e)}
        >
          <option value="MUSIQUE">MUSIQUE</option>
          {musiques.map((musique, index) => {
            return <option value={musique}>{display(musique)}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

let MAX_PAGES = 10;

const Article = ({ children, reference }) => {
  return (
    <article className="articleContainer" ref={reference}>
      {children}
    </article>
  );
};

function App() {
  const [params, setParams] = useState({mode: 0, param: ''});
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
            getArticles(pages, params.mode, params.param);
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
    getArticles(pages, params.mode, params.param);
    setPages((pages) => pages + 1);
  }, [params]); // TRES IMPORTANT

  const getFetchURL = (page, mode, param) => {
    switch (mode) {
      case 0:
        console.log(
          `fetch 0 http://localhost:8080/api/articles/?page=${page}&size=4`
        );
        // return `http://localhost:8080/api/articles/?page=${page}&size=4`;
      return `https://warm-taiga-19057.herokuapp.com/api/articles/?page=${page}&size=4`;
      case 1: // artiste
        console.log(
          ` fetch 1 http://localhost:8080/api/articles/byartiste?artiste=${param}&page=${page}&size=4`
        );
        // return `http://localhost:8080/api/articles/byartiste?artiste=${param}&page=${page}&size=4`;
      return `https://warm-taiga-19057.herokuapp.com/api/articles/byartiste?artiste=${param}&page=${page}&size=4`;
      case 2: // zone
        console.log(
          `fetch 2 http://localhost:8080/api/articles/byzone?zone=${param}&page=${page}&size=4`
        );
        // return `http://localhost:8080/api/articles/byzone?zone=${param}&page=${page}&size=4`;
      return `https://warm-taiga-19057.herokuapp.com/api/articles/byzone?zone=${param}&page=${page}&size=4`;
      case 3: // musique
        console.log(
          `fetch 3 http://localhost:8080/api/articles/bymusique?musique=${param}&page=${page}&size=4`
        );
        // return `http://localhost:8080/api/articles/bymusique?musique=${param}&page=${page}&size=4`;
      return `https://warm-taiga-19057.herokuapp.com/api/articles/bymusique?musique=${param}&page=${page}&size=4`;
      default:
        break;
    }
  };

  const setArtisteFromMenu = (artiste) => {
    setParametre(1, artiste);
  };

  const setZoneFromMenu = (zone) => {
    setParametre(2, zone);
  };

  const setMusiqueFromMenu = (musique) => {
    setParametre(3, musique);
  };

  const setParametre = (m, p) => {
    setHasMore(true);
    setPages(0);
    setArticles([]);
    setParams({mode : m, param: p});
  };

  const getArticles = async (page, m, p) => {
    setIsLoading(true);
    const urlToFetch = getFetchURL(page, m, p);
    await fetch(urlToFetch)
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
      <Menu
        setHome={setParametre}
        setArtisteFromMenu={setArtisteFromMenu}
        setZoneFromMenu={setZoneFromMenu}
        setMusiqueFromMenu={setMusiqueFromMenu}
      />
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
                      <Article reference={lastItemRef} key={indexArticle}>
                        <Card article={article}></Card>
                      </Article>
                    </>
                  );
                } else {
                  return (
                    <Article reference={lastItemRef} key={indexArticle}>
                      <Card article={article}></Card>
                    </Article>
                  );
                }
              } else {
                if (nouvelleSection) {
                  return (
                    <>
                      <Periode date={getDate(article)} />
                      <Article key={indexArticle}>
                        <Card article={article}></Card>
                      </Article>
                    </>
                  );
                } else {
                  return (
                    <Article key={indexArticle}>
                      <Card article={article}></Card>
                    </Article>
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
