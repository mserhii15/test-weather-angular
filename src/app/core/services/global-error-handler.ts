import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor(private _snackBar: MatSnackBar) {}

	handleError(error: any) {
		// Check if it's an error from an HTTP response
		if (!(error instanceof HttpErrorResponse)) {
			error = error.error; // get the error object
			this.openSnackBar(error);
		}
		// this.zone.run(() =>
		// 	this.errorDialogService.openDialog(error?.message || 'Undefined client error', error?.status),
		// );

		console.error('Error from global error handler', error);
	}

	private openSnackBar(message: string): void {
		this._snackBar.open(message, 'Close', {
			duration: 3000,
		});
	}
}
