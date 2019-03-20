import React from 'react';
import CurrentData from '../api/FetchingData';
import Icon from './Icon';
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

        // console.log(response);
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


    componentWillReceiveProps(nextProps) {
        this.onSubmitData(nextProps);

    }


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
                <Icon id={this.state.currentData.id} size={100} animation={true}/>
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

                </div>
            </div>

        );

    }
}


export default CurrentWeather;