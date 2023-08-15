import { ICords, Id } from '@weather/core';

export interface ICity {
	id: Id;
	name: string;
	coord: ICords;
	state: string;
	country: string;
	population: number;
	timezone: number;
	sunrise: number;
	sunset: number;
}
