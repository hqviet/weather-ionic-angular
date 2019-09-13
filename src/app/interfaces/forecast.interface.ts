import Forecast from '../models/forecast.model';
export interface IForecast {
    adapt(data: any): Forecast;
}
