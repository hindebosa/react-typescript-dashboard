import React, { useEffect } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./navigation/routes";
//aiosdnioasniodnasiodjasdiuwbdc quhuidsiovbid
const App = () => {
  const content = useRoutes(routes);
  return <>{content}</>;
};

export default App;
