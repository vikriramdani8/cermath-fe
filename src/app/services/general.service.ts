import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    romanize(num: any) {
        var lookup: any = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;
        for (i in lookup) {
            while (num >= lookup[i]) {
                roman += i;
                num -= lookup[i];
            }
        }
        return roman;
    }

    swalAlert(title: string, message: string, returnMessage: any) {
        return Swal.fire(
            title,
            message,
            returnMessage
        )
    }

    swalConfirm(title: string, text: string) {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
            reverseButtons: true
        })
    }

    showLoading() {
        Swal.fire({
            allowOutsideClick: false
        });
        Swal.showLoading();
    }

}
