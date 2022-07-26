import { Carousel } from "antd";
import React from "react";

const contentStyle = {
  height: "100%",
  color: "#fff",
  lineHeight: "100%",
  textAlign: "center",
  background: "#364d79",
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
