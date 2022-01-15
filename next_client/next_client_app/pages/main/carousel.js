import { useQuery, gql } from "@apollo/client";
import React, { Component } from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
  const BANNER_QUERY = gql`
    query Banner {
      getBanners {
        content {
          title
          detailContent
        }
        thumbnailUri
      }
    }
  `;
  const { data } = useQuery(BANNER_QUERY);

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
        {data?.getBanners?.map((element) => {
          return (
            <div style={{ height: "100px" }}>
              <img src={element.thumbnailUri} style={{ height: "100px" }} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
