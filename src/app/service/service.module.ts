import {InjectionToken, NgModule} from '@angular/core';

export const API_CONFIG = new InjectionToken('ApiConfigToken');

@NgModule({
  declarations: [],
  imports: [

  ],
  providers: [
    {
      provide: API_CONFIG, useValue: 'http://127.0.0.1:3000/'
    }
  ]
})
export class ServiceModule { }
