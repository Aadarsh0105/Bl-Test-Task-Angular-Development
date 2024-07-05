import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  let userDetail = localStorage.getItem("userDetails")
  if (userDetail !== null) {
    return true
  }
  else {
    alert("Please Login for accessing the portal")
    router.navigate([""]);
    return false
  }
  
}