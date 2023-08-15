import { ICity, Id } from '@weather/core';

export interface IWeather extends Pick<ICity, 'id' | 'name' | 'coord'> {
	weather: IWeatherData[];
	base: string;
	main: IWeatherMain;
	visibility: number;
	wind: IWind;
	rain: IRain;
	clouds: IClouds;
	dt: number;
	dt_txt: string;
	sys: ISystem;
	timezone: number;
	cod: number;
}

export interface IWeatherData {
	id: Id;
	main: string; // Rain, Snow etc.
	description: string;
	icon: string;
}

export interface IWeatherMain {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
	sea_level: number;
	grnd_level: number;
}

export interface IWind {
	speed: number;
	deg: number;
	gust: number;
}

export interface IRain {
	'1h': string;
}

export interface IClouds {
	all: number;
}

export interface ISystem {
	type: number;
	id: number;
	country: string;
	sunrise: number;
	sunset: number;
}
