import React, { useEffect } from "react";

const StatisticSection = () => {
  const initViz = () => {
    try {
      const containerDiv = document.getElementById("vizContainer");
      const url =
        "https://public.tableau.com/views/Huimitustatistic/Dashboard?:language=en-US&:display_count=n&:origin=viz_share_link";

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
