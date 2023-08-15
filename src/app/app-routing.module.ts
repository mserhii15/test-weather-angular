import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: 'home',
		loadComponent: () => import('./modules/city-weather/city-weather.component'),
	},
	{
		path: 'favorite',
		loadComponent: () => import('./modules/favorite-list/favorite-list.component'),
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabledBlocking',
			scrollPositionRestoration: 'enabled',
			useHash: true,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
