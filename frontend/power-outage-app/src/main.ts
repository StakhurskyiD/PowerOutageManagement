import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers } from './app/store/reducers';
import { GroupEffects } from './app/store/groups/group.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(reducers),
    provideEffects([GroupEffects]),

    // Include other providers like HttpClient if needed
  ]
}).catch(err => console.error(err));