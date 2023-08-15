import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { WeatherForecastService } from '@weather/core/services/weather-forecast.service';
import { DailyForecastComponent } from '@weather/shared/daily-forcast';
import { FavoriteService } from '@weather/core/services/favorite.service';
import { IWeather } from '@weather/core';
import { take } from 'rxjs';

@Component({
	standalone: true,
	selector: 'app-favorite-list',
	templateUrl: './favorite-list.component.html',
	styleUrls: ['./favorite-list.component.scss'],
	imports: [NgFor, DailyForecastComponent],
	host: {
		direction: 'column',
	},
})
export default class FavoriteListComponent implements OnInit {
	cityWeathers: IWeather[] = [];

	constructor(private weatherForecastService: WeatherForecastService, private favoriteService: FavoriteService) {}

	ngOnInit(): void {
		this.weatherForecastService
			.fetchWeatherByCityIds(this.favoriteService.favouritesIds)
			.pipe(take(1))
			.subscribe((cityWeathers: IWeather[]) => {
				console.log('cityWeathers', cityWeathers);
				this.cityWeathers = cityWeathers;
			});
	}
}
