import anxio from 'axios';

const KEY = '236265b4ed024adebb80704be6a97cc8';

export default anxio.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
    params: {
        APPID: KEY
    }
})
