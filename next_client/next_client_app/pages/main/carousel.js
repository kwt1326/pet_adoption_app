import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      appendDots: (dots) => (
        <div style={{ position: "absolute", bottom: "3px" }}>
          <ul style={{ margin: "0px", padding: "0" }}> {dots} </ul>
        </div>
      ),
    };
    return (
      <div>
        <Slider {...settings}>
          <div style={"height: 100%;"}>
            <img src="images/banner.jpg" />
          </div>
          <div style={"height: 100%;"}>
            <img src="images/banner2.jpg" />
          </div>
        </Slider>
      </div>
    );
  }
}
