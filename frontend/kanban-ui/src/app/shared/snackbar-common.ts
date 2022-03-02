import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
    providedIn: 'root'
})
export class SnackbarCommon {
    constructor(public snackbar: MatSnackBar) {}

    openSnackBar(message: string, duration: number, styleClass: string) {
        return this.snackbar.open(message, '', {
            duration: duration * 1000,
            panelClass: styleClass,
            verticalPosition: 'top',
            horizontalPosition: 'center'
        })
    }
}