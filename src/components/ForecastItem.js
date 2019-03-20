import React from 'react';
import Icon from "./Icon";
import './Forecast.css';


const ForecastItem = ({item}) => {

    let time = item.dt_txt.substring(5, 16);
    let max_cel = (item.main.temp_max - 273.15).toFixed();
    let min_cel = (item.main.temp_min - 273.15).toFixed();
    let max_fah = (max_cel * 9 / 5 + 32).toFixed();
    let min_fah = (min_cel * 9 / 5 + 32).toFixed();

    return (
        <div className='item'>
            <div className='item-content'>
                <div className='time'>
                    {time}
                </div>
                <i className='daily icon'>
                    <Icon id={item.weather[0].id} size={50} animation={false}/>
                </i>
                <div className='max-cel' id='0'>
                    {max_cel + ' °'}
                </div>
                <div className='min-cel' id='1'>
                    {min_cel + ' °'}
                </div>
                <div className='max-fah' id='2'>
                    {max_fah + ' °'}
                </div>
                <div className='min-fah' id='3'>
                    {min_fah + ' °'}
                </div>
            </div>
        </div>
    )

};

export default ForecastItem;