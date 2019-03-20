import React from 'react';
import ForecastItem from "./ForecastItem";
import Carousel from "./Carousel";


const ForecastList = ({data}) => {

    const renderedList = data.map(item => {
        return <ForecastItem key={item.dt} item={item} />
    });

    console.log({renderedList});

    return (
        <Carousel datalist={renderedList}/>
    )
};

export default ForecastList;