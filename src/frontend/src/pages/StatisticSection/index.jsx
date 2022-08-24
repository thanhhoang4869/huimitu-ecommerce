import config from "config/config";
import React, { useEffect } from "react";

const StatisticSection = () => {
  const initViz = () => {
    try {
      const containerDiv = document.getElementById("vizContainer");
      const url = config.STATISTIC_PATH;

      new window.tableau.Viz(containerDiv, url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    initViz();
  }, []);

  return <div id="vizContainer"></div>;
};

export default StatisticSection;
