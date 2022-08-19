import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavButton = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  overflow: hidden;
  transition: 0.4s;
  border-color: black;

  // For PC only
  &:hover {
    transform: scale(0.9, 0.9);
    box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
      -5px -5px -5px -5px rgba(0, 0, 0, 0.22);
  }
`;

const NavImg = styled.img`
  height: 45.8%;
  width: height;
  margin: 0;
  padding: 0;
`;

const Navbar = () => {
  const location = useLocation(); 
  const [page, setPage] = useState("/");

  const navSrc = {
    archive:
      page.includes("archive")
        ? "/img/navbar/archive-click.svg"
        : "/img/navbar/archive.svg",
    bookmark:
      page.includes("bookmark")
        ? "/img/navbar/bookmark-click.svg"
        : "/img/navbar/bookmark.svg",
    setting:
      page.includes("setting")
        ? "/img/navbar/setting-click.svg"
        : "/img/navbar/setting.svg",
    home: page === "/" ? "/img/navbar/home-click.svg" : "/img/navbar/home.svg",
  };

  const navigate = useNavigate();
  const handleClick = (url) => {
    navigate(url);
    setPage(() => url);
  };

  useEffect(() => {
    setPage(() => location.pathname);
  },);

  return (
    <>
      <NavButton onClick={() => handleClick("/archive")}>
        <NavImg src={navSrc.archive} alt="Archive" />
      </NavButton>
      <NavButton onClick={() => handleClick("/")}>
        <NavImg src={navSrc.home} alt="Home" />
      </NavButton>
      <NavButton onClick={() => handleClick("/bookmark")}>
        <NavImg src={navSrc.bookmark} alt="Bookmark" />
      </NavButton>
      <NavButton onClick={() => handleClick("/setting")}>
        <NavImg src={navSrc.setting} alt="Setting" />
      </NavButton>
    </>
  );
};

export default Navbar;
