import React from 'react';
import Data from '../api/FetchingData';
import List from './ForecastList';
import './Forecast.css'

class Forecast extends React.Component{

    state = {datalist: []};

    onFetchingData = async (props) => {
        const response = await Data.get('/forecast', {
            params: {
                // ES2015: Use `${}` function to invoke the parameter
                lat: `${props.lat}`,
                lon: `${props.lon}`,
                cnt: 8
            }
        });
        this.setState({
            datalist: response.data.list
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.onFetchingData(nextProps);
    }

    render(){
        return (
            <div className='container'>
                <List data={this.state.datalist}/>
            </div>
        )
    }

}

export default Forecast;