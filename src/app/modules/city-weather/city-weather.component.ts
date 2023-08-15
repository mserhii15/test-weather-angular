import { Component } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { SearchCityComponent } from './components/search-city';
import { ICity, IWeather } from '@weather/core';
import { WeatherForecastService } from '@weather/core/services/weather-forecast.service';
import { NgIf } from '@angular/common';
import { DailyForecastComponent } from '@weather/shared/daily-forcast';

@Component({
	standalone: true,
	selector: 'app-city-weather',
	templateUrl: './city-weather.component.html',
	styleUrls: ['./city-weather.component.scss'],
	host: {
		direction: 'column',
	},
	imports: [SearchCityComponent, MatDividerModule, NgIf, DailyForecastComponent],
})
export default class CityWeatherComponent {
	selectedWeather!: IWeather;
	constructor(private weatherForecastService: WeatherForecastService) {}

	public weatherCity(city: ICity): void {
		this.weatherForecastService.fetchWeatherByCityId(city.id).subscribe((weather: IWeather) => {
			this.selectedWeather = weather;
		});
	}
}
