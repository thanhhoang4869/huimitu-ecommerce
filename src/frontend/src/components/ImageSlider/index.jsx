import { Carousel } from "antd";
import React from "react";

const contentStyle = {
  height: "100%",
  color: "#fff",
  lineHeight: "100%",
  textAlign: "center",
  background: "#364d79",
};

const ImageSlider = () => (
  <Carousel autoplay>
    <div>
      <img
        style={contentStyle}
        src="https://5.imimg.com/data5/MS/HP/ON/SELLER-40186332/garden-planters-500x500.jpg"
      ></img>
    </div>
    <div>
      <img
        style={contentStyle}
        src="https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3"
      ></img>
    </div>
  </Carousel>
);

export default ImageSlider;
