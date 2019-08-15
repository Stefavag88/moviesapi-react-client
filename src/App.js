import React from "react";
import Home from "./components/Home";
import { LanguageProvider } from "./components/LanguageContext";
import LanguageMenuContainer from "./components/LanguageContext/LanguageMenu";
import HeaderMenu from './components/Header/index';

import "./App.css";
import "antd/dist/antd.css";
import MoviesGrid from "./components/MoviesGrid";

function App() {
  return (
    <div className="App">
    <LanguageProvider>
      <header className="header">
        <HeaderMenu/>
        <LanguageMenuContainer />
      </header>
      <main className="main-content">
        <Home />
        <MoviesGrid/>
      </main>
      </LanguageProvider>
    </div>
  );
}

export default App;
