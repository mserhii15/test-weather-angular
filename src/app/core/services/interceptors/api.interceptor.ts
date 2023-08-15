import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let { url } = request;
		const isAssets: boolean = url.includes('assets');
		const isExternalApi: boolean = url.startsWith('http');
		url = isAssets || isExternalApi ? url : `${environment.openWeatherMapAPI}${request.url}`;
		const apiReq: HttpRequest<unknown> = request.clone({ url });
		return next.handle(apiReq);
	}
}
