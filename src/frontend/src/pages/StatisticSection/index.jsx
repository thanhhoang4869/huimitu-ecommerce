import React, { useEffect } from "react";

const StatisticSection = () => {
  const initViz = () => {
    try {
      const containerDiv = document.getElementById("vizContainer");
      const url =
        "https://public.tableau.com/app/profile/phuc16102001/viz/Huimitustatistic/Dashboard";

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
