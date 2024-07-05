import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './services/data.service';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    //provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(DataService, {dataEncapsulation: false})),
    provideToastr(),
  ]
};
