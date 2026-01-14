import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ALL_WORKSPACES_GATEWAY, FIND_ONE_WORKSPACE_GATEWAY, TASKS_GATEWAY } from '@application/tokens';
import { HttpWorkspacesGateway } from '@infra/http-workspaces.gateway';
import { HttpTasksGateway } from '@infra/http-tasks.gateway';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: LOCALE_ID,
      useFactory: () => navigator.language || "fr",
    },
    {
      provide: FIND_ONE_WORKSPACE_GATEWAY,
      useClass: HttpWorkspacesGateway,
    },
    {
      provide: ALL_WORKSPACES_GATEWAY,
      useClass: HttpWorkspacesGateway,
    },
    {
      provide: TASKS_GATEWAY,
      useClass: HttpTasksGateway,
    },
  ]
};
