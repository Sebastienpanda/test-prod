import type { ApplicationConfig} from "@angular/core";
import { LOCALE_ID, provideBrowserGlobalErrorListeners } from "@angular/core";
import { provideRouter } from "@angular/router";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";

import { routes } from "./app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        {
            provide: LOCALE_ID,
            useFactory: () => navigator.language || "fr",
        },
    ],
};
