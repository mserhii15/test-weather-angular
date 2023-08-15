import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, switchMap } from 'rxjs';
import { cacheExpirationMs } from '@weather/core';

type ResponseCache = { timestamp: number; response: Observable<HttpEvent<unknown>> };

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
	private cache: Map<string, ResponseCache> = new Map<string, ResponseCache>();

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const cachedResponse: ResponseCache | undefined = this.cache.get(request.urlWithParams);
		const currentTime: number = Date.now();
		if (cachedResponse && currentTime - cachedResponse.timestamp < cacheExpirationMs) {
			return cachedResponse.response;
		}
		const response: Observable<HttpEvent<unknown>> = next.handle(request).pipe(
			switchMap((event: HttpEvent<unknown>) => {
				if (event instanceof HttpResponse) {
					this.cache.set(request.urlWithParams, { timestamp: currentTime, response: of(event) });
				}
				return of(event);
			}),
			shareReplay(1),
		);
		this.cache.set(request.urlWithParams, { timestamp: currentTime, response });
		return response;
	}
}
