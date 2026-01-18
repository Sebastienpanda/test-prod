import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { USER_GATEWAY, WORKSPACES_GATEWAY, COLUMNS_GATEWAY, TASKS_GATEWAY, STATUSES_GATEWAY } from '@application/tokens';
import { authInterceptor } from '@shared/interceptors/auth.interceptor';
import { errorInterceptor } from '@shared/interceptors/error.interceptor';
import { HttpUserGateway } from '@infra/http-user.gateway';
import { HttpWorkspacesGateway } from '@infra/http-workspaces.gateway';
import { HttpColumnsGateway } from '@infra/http-columns.gateway';
import { HttpTasksGateway } from '@infra/http-tasks.gateway';
import { HttpStatusesGateway } from '@infra/http-statuses.gateway';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
        {
            provide: LOCALE_ID,
            useFactory: () => navigator.language || "fr",
        },
        {
            provide: USER_GATEWAY,
            useClass: HttpUserGateway,
        },
        {
            provide: WORKSPACES_GATEWAY,
            useClass: HttpWorkspacesGateway,
        },
        {
            provide: COLUMNS_GATEWAY,
            useClass: HttpColumnsGateway,
        },
        {
            provide: TASKS_GATEWAY,
            useClass: HttpTasksGateway,
        },
        {
            provide: STATUSES_GATEWAY,
            useClass: HttpStatusesGateway,
        },
    ]
};
