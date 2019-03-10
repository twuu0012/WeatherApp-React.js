import React from 'react';
import CurrentData from '../api/CurrentData';
import WeatherIcon from 'react-animated-weather';
import Spinner from './Spinner';
import './CurrentWeather.css';

class CurrentWeather extends React.Component {

    state = {currentData: {}, currentCity: '', tempCel: '', tempFah: '', wind: '', humidity:'', cloud: ''};

    onSubmitData = async (props) => {


        const response = await CurrentData.get('/weather', {
            params: {
                // ES2015: Use `${}` function to invoke the parameter
                lat: `${props.lat}`,
                lon: `${props.lon}`
            }
        });

        console.log(response);
        this.setState({
            currentData: response.data.weather[0],
            currentCity: response.data.name,
            tempCel: response.data.main.temp - 273.15,
            tempFah: this.state.tempCel * 9 / 5 + 32,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            cloud: response.data.clouds.all
        });
    };


    // Doesn't work cuz if the child is rendered before the parent,
    // the geolocation data is empty.

    // componentDidMount() {
    //     this.onSubmitData(this.props);
    // };

    componentWillReceiveProps(nextProps) {
        this.onSubmitData(nextProps);

    }


    // Define the default icon
    icons = (icon) => {
        return {icon:icon, color: 'black', size: 100, animate: true}
    };

    //Return the icon element based on the icon name
    iconDisplay(name) {
        const icon = this.icons(name);
        return (
            <div className='current-weather icon'>
                <WeatherIcon icon={icon.icon} color={icon.color} size={icon.size} animate={icon.animate}/>
            </div>

        )
    };

    // More parameters: humidity, cloudiness and wind speed
    paramsDisplay(){
        var description = '';
        if (this.state.currentData.description === undefined){
            description = '-';
        }else {
            description = this.state.currentData.description.toUpperCase();
        }

        return (
            <div className='params'>
                {description}
                <br/>
                Wind: {this.state.wind} km/h
                <br/>
                Humidity: {this.state.humidity} %
                <br/>
                Cloudiness: {this.state.cloud} %
            </div>
        )

    };


    // Check the current weather from API and display the icon based on fetched data
    checkWeather() {
        const now = new Date().getHours();
        const id = this.state.currentData.id;

        if (now > 4 && now < 18) {
            // Day and Clear
            if (id === 800) {

                return this.iconDisplay('CLEAR_DAY');


            }
            // Day and Partly Cloudy
            if (id === 801 || id === 803 || id === 804){
                return this.iconDisplay('PARTLY_CLOUDY_DAY');

            }
        } else {
            // Night and Clear
            if (id === 800) {
                return this.iconDisplay('CLEAR_NIGHT')
            }
            // Night and Partly Cloudy
            if (id === 801 || id === 803 || id === 804){
                return this.iconDisplay('PARTLY_CLOUDY_NIGHT');
            }
        }

        // Rain
        if (id >= 200 && id <= 531) {
            return this.iconDisplay('RAIN');
        }

        //Snow
        if (id >= 600 && id <= 622) {
            if (id >= 611 && id <= 616) {
                return this.iconDisplay('SLEET');
            }
            return this.iconDisplay('SNOW');
        }

        //Wind
        if (id >= 701 && id <= 781) {
            if (id === 741) {
                return this.iconDisplay('FOG');
            }
            return this.iconDisplay('WIND');
        }

        //Cloudy
        if (id === 802){
            return this.iconDisplay('CLOUDY');

        }
        // Loading data...
        return <Spinner message={"Fetching Your Location"}/>;

    }

    selectUnit() {
        return (
            <div className='mode_button ui buttons'>
                <button className='cel ui button' onClick={this.onClickCel}>Celsius</button>
                <button className='fah ui button' onClick={this.onClickFah}> Fahrenheit</button>
            </div>
        )
    }

    onClickCel = event =>{

        document.getElementsByClassName('cel-temp')[0].style.display = 'block';
        document.getElementsByClassName('fah-temp')[0].style.display = 'none';

    }

    onClickFah = event =>{
        document.getElementsByClassName('cel-temp')[0].style.display = 'none';
        document.getElementsByClassName('fah-temp')[0].style.display = 'block';

    }

    getTime() {
        const dayNumber = new Date().getDay();
        const clockTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return weeks[dayNumber] + ' ' + clockTime;
    }

    displayTemp() {
        var cel = '';
        var fah = '';
        if (this.state.tempCel === ''){
            cel = '';
            fah = '';
        }else{
            cel = parseInt(this.state.tempCel) + ' °C';
            fah = parseInt(this.state.tempFah) + ' °F'
        }

        return (
            <div className='temp'>
                <div className='cel-temp'>
                    {cel}
                </div>
                <div className='fah-temp'>
                    {fah}
                </div>
                {this.checkWeather()}
            </div>
        )
    }

    render() {

        return (
            <div className='container'>
                <div className='content'>

                    <div className='city-label'>
                        {this.state.currentCity}
                    </div>
                    <div className='local-time'>
                        {this.getTime()}
                    </div>
                    {this.displayTemp()}
                    {this.paramsDisplay()}
                    {this.selectUnit()}

                </div>
            </div>

        );

    }
}





export default CurrentWeather;