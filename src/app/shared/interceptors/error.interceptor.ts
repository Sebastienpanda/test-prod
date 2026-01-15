import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, retry, throwError, timer } from "rxjs";
import { ErrorService } from "@shared/services/error.service";

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorService = inject(ErrorService);

    return next(req).pipe(
        retry({
            count: MAX_RETRIES,
            delay: (error: HttpErrorResponse, retryCount) => {
                if (!RETRYABLE_STATUS_CODES.includes(error.status)) {
                    throw error;
                }
                return timer(RETRY_DELAY_MS * retryCount);
            },
        }),
        catchError((error: HttpErrorResponse) => {
            errorService.handleHttpError(error);
            return throwError(() => error);
        }),
    );
};
