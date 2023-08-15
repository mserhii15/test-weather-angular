import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageManager {
	private storageSub: ReplaySubject<string> = new ReplaySubject<string>(1);

	storageChange$: Observable<string> = this.storageSub.asObservable();
	private notifyStorageChanges(): void {
		this.storageSub.next('changed');
	}

	setItem(key: string, value: unknown): void {
		localStorage.setItem(key, JSON.stringify(value));
		this.notifyStorageChanges();
	}

	getItem(key: string): any {
		const item: string | null = localStorage.getItem(key);
		if (item && item !== 'undefined' && item !== 'null') {
			return JSON.parse(item);
		}
		return null;
	}

	removeItem(key: string): void {
		localStorage.removeItem(key);
		this.notifyStorageChanges();
	}

	clearAll(): void {
		localStorage.clear();
		this.notifyStorageChanges();
	}
}
