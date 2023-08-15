import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { IForecast, IWeather } from '@weather/core';
import { WeatherForecastService } from '@weather/core/services/weather-forecast.service';
import { map, Observable } from 'rxjs';

const material = [MatSnackBarModule, MatDividerModule, MatCardModule];

@Component({
	standalone: true,
	selector: 'app-five-days-forecast',
	templateUrl: './five-days-forecast.component.html',
	styleUrls: ['./five-days-forecast.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [...material, NgIf, NgFor, DatePipe, DecimalPipe, AsyncPipe],
})
export class FiveDaysForecastComponent implements OnInit {
	@Input({ required: true }) cityWeather!: IWeather;

	fiveDaysForecast$!: Observable<any>;
	constructor(private weatherForecastService: WeatherForecastService) {}

	ngOnInit(): void {
		this.fiveDaysForecast$ = this.weatherForecastService.fetchForecastByCityWeatherId(this.cityWeather.id).pipe(
			map((response: IForecast) => {
				const dailyForecasts: any[] = [];
				const hourlyForecastsMap: Map<string, any[]> = new Map<string, any[]>();

				response.list.forEach((forecast: IWeather) => {
					const date: string = forecast.dt_txt.split(' ')[0];
					if (!hourlyForecastsMap.has(date)) {
						hourlyForecastsMap.set(date, []);
					}
					hourlyForecastsMap.get(date)?.push(forecast);
				});

				hourlyForecastsMap.forEach((hourlyForecasts, date) => {
					dailyForecasts.push({ date, hourlyForecasts });
				});

				return dailyForecasts;
			}),
		);
	}
}
