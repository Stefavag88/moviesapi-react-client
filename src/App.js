import React from "react";
import "./App.css";
import Home from "./components/Home";
import { LanguageProvider } from "./components/LanguageContext";
import "antd/dist/antd.css";
import LanguageMenuContainer from "./components/LanguageContext/LanguageMenu";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <LanguageMenuContainer />
        <Home />
      </LanguageProvider>
    </div>
  );
}

export default App;
