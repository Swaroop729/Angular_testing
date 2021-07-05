/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsComponent } from './user-details.component';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';

// Here we are testing the routing navigation for angular application. For that we might need the angular 
// routing class but it might involve a lot of complexity so instead we create a stub ( a duplicate implementation)
// for an router class instead of original router method.

// using the real router can happend but that includes the declration of real angular router moudule, 
// defining the routes change the implementations and also it would introuduce a lot of complexity, 
// some people might do it but on a personal front if we do that by using the angular router and to check
// the url after the navigate method is being called from router method. It is like we are testing angular 
// router instead of our own class so instead we can create a small stub and check if it is working properly by 
// declaring the methods we are using

// Also particularly for routing we might need to check the routes also since sometimes the path can be changed
// and when changed and we request to navigate to that path it might not exist so we need to have 
// one test for checking wether it has a user path defined for that particular route.
// second test for checking whether the route has being called on an event correctly.

// Also while checking for the router we need to check the router params also. In user details component
// if the user id is 0 we are rerouting it to not found page and that 0 is being read from route params.
// and here if we can see that the ActivatedRoute has replaced with ActivatedRouteStub so in the 
// ActivatedRouteStub we don't have anything to modify as the defined parameter so for that we create it 
// an observable that can send the value we require everytime an route params.

// In order to deal with the promises we will be using a different technique because while we are dealing 
// with promises other than subscribe method, the test are performed before and the successively the promise
// will be resolved this will happen because the promises are queued. And if this happens all our tests are
// going to fail, so in order for a workaround for this. we need a new technique to handle promises using async

class routerStub {
  navigate(params:any){}
}

class ActivatedRouterStub {
  // Previously defined the params as observable but we can send the requrie values as observable through another 
  // method also as shown below
  // params : Observable<any> = of()

  private subject = new Subject()

  push(value : any){
      this.subject.next(value);
  }

  // we have converted the params field to a property
  get params(){
      return this.subject.asObservable();
  }
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      // now we need make the routerstub (duplicate class) to be called instead of original angular router
      providers:[{provide : Router, useClass: routerStub},
        {provide : ActivatedRoute, useClass: ActivatedRouterStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  
  it('should check the user has been navigated on clicking of save with a user object', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router,'navigate')
    component.save()

    expect(spy).toHaveBeenCalledWith(['users'])
  });

  it('should check the user has been navigated on not found page  when 0 came as route parameter using Activated route'
  , () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router,'navigate')

    let route :ActivatedRouterStub = TestBed.get(ActivatedRoute)
    route.push({id:0})
 
    expect(spy).toHaveBeenCalledWith(['not-found'])
  });

  


});
