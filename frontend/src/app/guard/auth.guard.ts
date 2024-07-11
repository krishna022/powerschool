import { CanActivateFn } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('currentUser')){
    return true;
  }else{
    return false;
  }
  
};
