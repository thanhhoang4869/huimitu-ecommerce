import { Carousel } from "antd";
import React from "react";

const contentStyle = {
  height: "100%",
  color: "#fff",
  lineHeight: "100%",
  textAlign: "center",
};

const ImageSlider = ({ children }) => (
  <Carousel autoplay>
    {(children || []).map((item) => (
      <div>
        <img style={contentStyle} alt="img" src={item}></img>
      </div>
    ))}
  </Carousel>
);

export default ImageSlider;
