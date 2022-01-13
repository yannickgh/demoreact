import "./menu.css";
import React, { useState, useEffect, useRef, createRef } from "react";

const items = [
  {
    name: "Pano225",
    color: "#f44336",
    href: "#",
  },
  {
    name: "Artiste",
    color: "#e91e63",
    href: "#",
  },
  {
    name: "Zone",
    color: "#9c27b0",
    href: "#",
  },
  {
    name: "Musique",
    color: "#673ab7",
    href: "#",
  },
];

const MenuItem = (props) => {

  const $root = useRef();
  const $indicator = useRef();
  const $items = useRef(props.items.map(createRef));
  const [active, setActive] = useState(0); // index active
  const [previous, setPrevious] = useState(0); // index previous

  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect();
    const { width, height, top, left } =
      $items.current[active].current.getBoundingClientRect();

    $indicator.current.style.left = left - menuOffset.x + "px";
    $indicator.current.style.top = top - menuOffset.y + "px";
    $indicator.current.style.width = width + "px";
    $indicator.current.style.height = height + "px";

    $indicator.current.style.backgroundColor = items[active].color;
    setPrevious(active);
  };

  useEffect(() => {
    animate();
  }, [active]);

  return (
    <div ref={$root} className="menu">
      {items.map((item, index) => (
        <a
          key={item.name}
          ref={$items.current[index]}
          className={`item ${active === index ? "active" : ""}`}
          onClick={() => {
            setActive(index);
          }}
          href={item.href}
        >
          {item.name}
        </a>
      ))}
      <div ref={$indicator} className="indicator" />
    </div>
  );
};

const Menu = (props) => {
  return <MenuItem items={items} cliks={props.clicks} />;
};

export default Menu;
