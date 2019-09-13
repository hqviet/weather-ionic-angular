import { Component, OnInit } from '@angular/core';
import Weather from '../models/weather.model';
import WeatherService from '../services/weather.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  weather;
  constructor(
    private weatherService: WeatherService,
    private geolocation: Geolocation,
    private storage: Storage,
  ) {}

  ngOnInit() {
    this.geolocation
      .getCurrentPosition()
      .then(response => {
        this.storage.set('position',  {
          lat: response.coords.latitude,
          lng: response.coords.longitude
        });
        this.weatherService.getCurrentWeather(response.coords.latitude, response.coords.longitude).subscribe(data => {
          this.weather = (new Weather()).adapt(data);
          console.log(data);
        });
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }
}
