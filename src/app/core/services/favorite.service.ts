import { Injectable } from '@angular/core';
import { EStorageKeys, Id } from '@weather/core';
import { LocalStorageManager } from './storage-manager.service';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
	favouritesCityIdsMap: Record<Id, boolean> = {};
	favouritesIds: Id[] = [];
	constructor(private localStorageManager: LocalStorageManager) {
		this.localStorageManager
			.getItem(EStorageKeys.FAVORITES_CITY)
			?.forEach((id: Id) => (this.favouritesCityIdsMap[id] = true));
		this.updateFavoriteCityLocalStorage();
	}

	toggleFavoriteCity(cityId: Id): void {
		this.favouritesCityIdsMap[cityId] = !this.favouritesCityIdsMap[cityId];
		this.updateFavoriteCityLocalStorage();
	}

	updateFavoriteCityLocalStorage(): void {
		this.favouritesIds = Object.keys(this.favouritesCityIdsMap).reduce(
			(ids: Id[], currentId: Id) => (this.favouritesCityIdsMap[currentId] ? [...ids, currentId] : ids),
			[] as Id[],
		);
		this.localStorageManager.setItem(EStorageKeys.FAVORITES_CITY, this.favouritesIds);
	}
}
