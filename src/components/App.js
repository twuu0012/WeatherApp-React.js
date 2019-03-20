import React from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import './App.css';
import Button from './Button';

class App extends React.Component{

    state = {lat: null, lon: null, errorMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({lat: position.coords.latitude, lon: position.coords.longitude})
            },
            error => {
                this.setState({errorMessage: error.message})
            }
        );
    }

    render() {
        if (this.state.errorMessage){
            return <div>{this.state.errorMessage}</div>
        }

        return (
            <div className='app ui container'>
                <CurrentWeather lat={this.state.lat} lon={this.state.lon}/>
                <Button />
                <Forecast lat={this.state.lat} lon={this.state.lon}/>
            </div>
        )
    }
}

export default App;