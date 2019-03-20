import React from 'react';
import WeatherIcon from 'react-animated-weather';
import Spinner from "./Spinner";
import './CurrentWeather.css';

const Icon = props => {

    // Define the default icon
    const defaultIcon = (name, size, bool) => {
        return {icon: name, color: 'black', size: size, animate: bool}
    };

    //Return the icon element based on the icon name
    const iconDisplay = (name, size, bool) => {
        const icon = defaultIcon(name, bool);
        return (
            <div className='current-weather icon'>
                <WeatherIcon icon={name} color={icon.color} size={size} animate={bool}/>
            </div>

        )
    };

    // Check the current weather from API and display the icon based on fetched data
    const now = new Date().getHours();
    const id = props.id;
    const bool = props.animation;
    const size = props.size;

    if (now > 4 && now < 18) {
        // Day and Clear
        if (id === 800) {

            return iconDisplay('CLEAR_DAY', size, bool);


        }
        // Day and Partly Cloudy
        if (id === 801 || id === 803 || id === 804) {
            return iconDisplay('PARTLY_CLOUDY_DAY', size, bool);

        }
    } else {
        // Night and Clear
        if (id === 800) {
            return iconDisplay('CLEAR_NIGHT', size, bool);
        }
        // Night and Partly Cloudy
        if (id === 801 || id === 803 || id === 804) {
            return iconDisplay('PARTLY_CLOUDY_NIGHT', size, bool);
        }
    }

    // Rain
    if (id >= 200 && id <= 531) {
        return iconDisplay('RAIN', size, bool);
    }

    //Snow
    if (id >= 600 && id <= 622) {
        if (id >= 611 && id <= 616) {
            return iconDisplay('SLEET', size, bool);
        }
        return iconDisplay('SNOW', size, bool);
    }

    //Wind
    if (id >= 701 && id <= 781) {
        if (id === 741) {
            return iconDisplay('FOG', size, bool);
        }
        return iconDisplay('WIND', size, bool);
    }

    //Cloudy
    if (id === 802) {
        return iconDisplay('CLOUDY', size, bool);
    }
    // Loading data...
    return <Spinner message={"Fetching Your Location"}/>;


};


export default Icon;