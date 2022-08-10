import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  userDetails: any;
  isSignedIn: boolean;
  showLoader = true;
  constructor() { }
}
