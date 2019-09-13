import { IAdapter } from '../interfaces/adapter.interface';
export default class Weather implements IAdapter<Weather> {
    description: string;
    icon: string;
    temp: number;
    pressure: number;
    humidity: number;
    wind: number;
    cloud: number;
    name: string;

    constructor() {}

    adapt = data => {
        const tmp = new Weather();
        tmp.name = data.name ? data.name : '';
        tmp.description = data.weather[0].description ? data.weather[0].description : '';
        tmp.icon = data.weather[0].icon ? 'http://openweathermap.org/img/wn/' + data.weather[0].icon +  '@2x.png' : '';
        tmp.temp = data.main.temp ? data.main.temp : null;
        tmp.pressure = data.main.pressure ? data.main.pressure : null;
        tmp.humidity = data.main.humidity ? data.main.humidity : null;
        tmp.wind = data.wind ? data.wind.speed : null;
        tmp.cloud = data.clouds ? data.clouds.all : null;
        tmp.name = data.name ? data.name : '';
        return tmp;
    }

}
