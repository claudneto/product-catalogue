import { bootstrapApplication } from '@angular/platform-browser';
import { App } from '@br/app/app';
import { appConfig } from '@br/app/app.config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
