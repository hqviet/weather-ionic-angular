import Weather from '../models/weather.model';
export interface IWeather {
    adapt(data: any): Weather;
}