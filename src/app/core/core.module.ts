import { CommonModule, NgIf } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { HeaderComponent } from '@weather/core/components/header';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [HeaderComponent],
	imports: [CommonModule, PlatformModule, MatButtonModule, RouterLink, NgIf, HttpClientModule, MatSnackBarModule],
	exports: [HeaderComponent, HttpClientModule, MatSnackBarModule],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() private readonly parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('CoreModule has already been loaded. Import the core module in AppModule only.');
		}
	}

	public static forRoot(): ModuleWithProviders<CoreModule> {
		return {
			ngModule: CoreModule,
			providers: [],
		};
	}
}
