import { ChangeDetectionStrategy, EventEmitter, Component, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe } from '@angular/common';

import { debounceTime, startWith } from 'rxjs/operators';
import { Observable, switchMap } from 'rxjs';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ICity } from '@weather/core';
import { WeatherForecastService } from '@weather/core/services/weather-forecast.service';

const material = [MatAutocompleteModule, MatFormFieldModule, MatInputModule];

@Component({
	standalone: true,
	selector: 'app-search-city',
	templateUrl: './search-city.component.html',
	styleUrls: ['./search-city.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'container',
		direction: 'column',
	},
	imports: [...material, ReactiveFormsModule, FormsModule, NgFor, AsyncPipe],
})
export class SearchCityComponent implements OnInit {
	@Output() selectedCity: EventEmitter<ICity> = new EventEmitter<ICity>();
	filteredCities$!: Observable<ICity[]>;
	searchControl: FormControl<string> = new FormControl<string>('') as FormControl<string>;

	constructor(private weatherForecastService: WeatherForecastService) {}
	ngOnInit(): void {
		this.filteredCities$ = this.searchControl.valueChanges.pipe(
			startWith(''),
			debounceTime(500),
			switchMap((query: string) => this.weatherForecastService.fetchCitiesByName(query)),
		);
	}

	onSelectCity(city: ICity): void {
		this.selectedCity.emit(city);
	}

	displayWithNameOfCity: (city: ICity) => string = (city: ICity): string => city.name;
}
