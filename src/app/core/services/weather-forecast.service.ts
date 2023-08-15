import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap, zip } from 'rxjs';
import { cacheExpirationMs, ICity, Id, IForecast, IWeather } from '@weather/core';
import { environment } from '../../../environments/environment';
import { LocalStorageManager } from '@weather/core/services/storage-manager.service';
import { FavoriteService } from '@weather/core/services/favorite.service';

@Injectable({
	providedIn: 'root',
})
export class WeatherForecastService {
	constructor(
		private http: HttpClient,
		private localStorageManager: LocalStorageManager,
		private favoriteService: FavoriteService,
	) {}
	public fetchCitiesByName(cityName: string): Observable<ICity[]> {
		return this.http.get<ICity[]>(`${environment.citiesAPI}?name_like=${cityName}&_limit=50`);
	}

	public fetchWeatherByCityId(cityId: Id): Observable<IWeather> {
		const currentTime: number = Date.now();
		const cachedResponse = this.localStorageManager.getItem(`${cityId}`);
		if (
			this.favoriteService.favouritesCityIdsMap[cityId] &&
			cachedResponse &&
			currentTime - cachedResponse.timestamp < cacheExpirationMs
		) {
			return of(cachedResponse.weather);
		} else {
			this.localStorageManager.removeItem(`${cityId}`);
		}
		return this.http.get<IWeather>(`weather?id=${cityId}&units=metric`).pipe(
			tap((resp: IWeather) => {
				if (this.favoriteService.favouritesCityIdsMap[cityId]) {
					this.localStorageManager.setItem(`${resp.id}`, { timestamp: currentTime, weather: resp });
				}
			}),
		);
	}

	public fetchForecastByCityWeatherId(cityWeatherId: Id): Observable<IForecast> {
		return this.http.get<IForecast>(`forecast?id=${cityWeatherId}&units=metric`);
	}

	public fetchWeatherByCityIds(ids: Id[]): Observable<IWeather[]> {
		return zip<IWeather[]>(ids.map((id: Id) => this.fetchWeatherByCityId(id)));
	}
}
