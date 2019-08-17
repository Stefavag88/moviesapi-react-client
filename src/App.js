import React from "react";
import Home from "./components/Home";
import { LanguageProvider } from "./components/LanguageContext";
import LanguageMenuContainer from "./components/LanguageContext/LanguageMenu";
import HeaderMenu from "./components/Header/index";

import "./App.css";
import "antd/dist/antd.css";
import MoviesGrid from "./components/MoviesGrid";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateMovieContainer from "./components/CreateMovieContainer/index";
import { message } from "antd";

message.config({
  top: 50,
  duration: 3,
  maxCount: 3
});

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Router>
          <header className="header">
            <HeaderMenu />
            <LanguageMenuContainer />
          </header>
          <main className="main-content">
            <Home />
            <Route path="/" exact component={MoviesGrid} />
            <Route path="/create" exact component={CreateMovieContainer} />
          </main>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
