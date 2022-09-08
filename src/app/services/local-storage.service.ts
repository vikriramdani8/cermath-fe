import { Injectable } from '@angular/core';

@Injectable( {
  providedIn : 'root'
} )
export class LocalStorageService {

  insertValue ( key: string, value: any ) {
    localStorage.setItem( key, value );
  }

  getValue ( key: string ) {
    return localStorage.getItem( key );
  }

  removeValue ( key: string ) {
    localStorage.removeItem( key );
  }

  clearAll () {
    localStorage.clear();
  }

}
