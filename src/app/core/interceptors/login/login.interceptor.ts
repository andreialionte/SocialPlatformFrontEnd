import { HttpInterceptorFn } from '@angular/common/http';

//this interceptor adding an Authorization header to the HTTP REQS,
//which is typically used to verify if a user is logged in and authorized to access certain endpoints.
//to CHECK if the api ACCEPTS to get the data like if u are loggin or not 
//some endpoints use authorization header and if u are not loggin u will not acces that api
export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  // debugger; //test it
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Interceptor is adding the Authorization header");
    return next(authReq);

};
