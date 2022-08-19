import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Bookmark from "./pages/Bookmark";
import Setting from "./pages/Setting";

import ArchiveAlbum from "./pages/ArchiveAlbum";
import ArchivePhoto from "./pages/ArchivePhoto";

import Api from "./Api";

import Navbar from "./components/Navbar";

import "./App.css";

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

const ContentsDom = styled.div`
  width: 100%;
  height: 94%;
  background: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavDom = styled.div`
  width: 100%;
  height: 6%;
  background: #ffffff;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  z-index: 3;
`;

function App() {
  return (
    <>
      <StyledApp>
        <ContentsDom>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/archive/:album_id" element={<ArchiveAlbum />} />  
              <Route path="/archive/:album_id/:photo_id" element={<ArchivePhoto />} />  
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/api" element={<Api />} />
              <Route element={<div>abc</div>}></Route>
            </Routes>
        </ContentsDom>
        <NavDom>
          <Navbar />
        </NavDom>
      </StyledApp>
    </>
  );
}

export default App;
