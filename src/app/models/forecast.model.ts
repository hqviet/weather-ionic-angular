import { IForecast } from '../interfaces/forecast.interface';

export default class Forecast implements IForecast {
    day: string;
    clouds: {};
    dt: number;
    dtTxt: string;
    main: {};
    rain: {};
    sys: {};
    weather: [];
    wind: {};

    constructor() {}

    adapt(data: any) {
        let tmp = new Forecast();
        tmp.day = data.dt_txt.split(' ')[0];
        tmp.dt = data.dt;
        tmp.dtTxt = data.dt_txt;
        tmp.main = data.main;
        tmp.rain = data.rain;
        tmp.sys = data.sys;
        tmp.weather = data.weather;
        tmp.wind = data.wind;
        return tmp;
    }
}
