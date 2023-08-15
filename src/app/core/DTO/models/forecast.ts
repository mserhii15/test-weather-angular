import {ICity, IWeather} from '@weather/core';

export interface IForecast {
	cod: string;
	message: number;
	cnt: number;
	list: IWeather[];
	city: ICity;
}
