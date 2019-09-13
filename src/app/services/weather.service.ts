import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Weather from '../models/weather.model';
import Forecast from '../models/forecast.model';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export default class WeatherService {
  readonly weatherUrl = 'http://api.openweathermap.org/data/2.5/';
  readonly apiKey = '72a2a8b54d2b461abdd58276ae109111';

  constructor(private http: HttpClient, private httpNative: HTTP) { }

  getCurrentWeatherNative(latitude, longitude, completion, error) {
    this.httpNative.get(`${this.weatherUrl}weather`, {
      units: 'metric',
      appid: `${this.apiKey}`,
      lat: latitude,
      lon: longitude
    }, {})
    .then(response => completion(response))
    .catch(response => error(response));
  }

  getCurrentWeather(lat, lng): Observable<Weather> {
    return this.http.get<Weather>(`${this.weatherUrl}weather?units=metric&appid=${this.apiKey}&lat=${lat}&lon=${lng}`);
  }

  get5DayForecast(lat, lng): Observable<Forecast[]> {
    return this.http.get<Forecast[]>(`${this.weatherUrl}forecast?units=metric&appid=${this.apiKey}&lat=${lat}&lon=${lng}`);
  }

}
