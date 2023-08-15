import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf, AsyncPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ICity, Id, IForecast, IWeather } from '@weather/core';
import { FavoriteService } from '@weather/core/services/favorite.service';
import { FiveDaysForecastComponent } from '@weather/shared/five-days-forecast';
import { SearchCityComponent } from '@weather/modules/city-weather/components/search-city';

const material = [MatSnackBarModule, MatDividerModule, MatButtonModule, MatCardModule];

@Component({
	standalone: true,
	selector: 'app-daily-forecast',
	templateUrl: './daily-forecast.component.html',
	styleUrls: ['./daily-forecast.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		...material,
		FiveDaysForecastComponent,
		SearchCityComponent,
		FormsModule,
		DecimalPipe,
		AsyncPipe,
		NgFor,
		NgIf,
	],
})
export class DailyForecastComponent {
	@Input({ required: true }) cityWeather!: IWeather;
	showForeCast: boolean = false;
	constructor(public favoriteService: FavoriteService) {}

	toggleFavorite(cityId: Id): void {
		this.favoriteService.toggleFavoriteCity(cityId);
	}
}
