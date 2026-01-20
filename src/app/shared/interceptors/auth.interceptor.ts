// import { HttpInterceptorFn } from "@angular/common/http";
// import { inject } from "@angular/core";
// import { AuthService } from "@application/signin/auth.service";
// import { from, switchMap } from "rxjs";
//
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//     const authService = inject(AuthService);
//
//     // Convertir la Promise en Observable avec from()
//     return from(authService.getToken()).pipe(
//         switchMap((token) => {
//             // Si un token existe, on clone la requête et on ajoute le header Authorization
//             if (token) {
//                 const clonedReq = req.clone({
//                     setHeaders: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 return next(clonedReq);
//             }
//
//             // Sinon, on envoie la requête sans modification
//             return next(req);
//         }),
//     );
// };
