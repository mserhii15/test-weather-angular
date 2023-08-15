import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { GlobalErrorHandler } from '@weather/core/services/global-error-handler';
import { AppRoutingModule } from '@weather/app-routing.module';
import { APIInterceptor } from '@weather/core/services/interceptors/api.interceptor';
import { CacheInterceptor } from '@weather/core/services/interceptors/cache.interceptor';
import { AuthInterceptor } from '@weather/core/services/interceptors/auth.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule.forRoot()],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: APIInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor,
			multi: true,
		},
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
