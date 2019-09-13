import { Component, OnInit } from '@angular/core';
import WeatherService from '../services/weather.service';
import Forecast from '../models/forecast.model';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss']
})
export class ForecastPage implements OnInit {
  forecast;
  days: string[] = [];
  forcastResults;

  forecastList: Forecast[] = [];
  forecastAdapter: Forecast;
  constructor(
    private weatherService: WeatherService,
    private storage: Storage
  ) {
    this.forecastAdapter = new Forecast();
  }

  ngOnInit() {
    this.storage.get('position').then(position => {
      this.weatherService
      .get5DayForecast(position.lat, position.lng)
      .subscribe(response => {
        this.forecast = response;
        if (this.forecast.list) {
          this.forecast.list.forEach(e => {
            this.forecastList.push(this.forecastAdapter.adapt(e));
            if (!this.days.includes(this.forecastAdapter.adapt(e).day)) {
              this.days.push(this.forecastAdapter.adapt(e).day);
            }
          });
        } else {
          console.log('no data');
        }
      });
    });
  }

  getForecastFilters(event) {
    this.forcastResults = this.forecastList.filter(f => f.day === event.detail.value);
  }

  roundNumber(num) {
    return Math.round(num);
  }

  getIconUrl(icon) {
    return 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
  }

  getTimeOfDay(str) {
   return str.split(' ')[1].split(':').slice(0, 2).join(':');
  }

  detectTimeOfDay(str) {
    return str;
  }

}
