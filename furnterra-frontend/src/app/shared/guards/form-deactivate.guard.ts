import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface canFormDeactivate{
  canDeactivate:()=>Observable<boolean> | Promise <boolean> | boolean
}

export const formDeactivateGuard: CanDeactivateFn<canFormDeactivate>=(
  component,
  _currentState,
  _currentRoute,
  nextState
)=>{

    const nextUrl = nextState?.url || ''

    if(!nextUrl.startsWith('/checkout')){
      return component.canDeactivate()
    }

    return true

  }
