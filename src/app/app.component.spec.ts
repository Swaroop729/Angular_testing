/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';

// This test is specifically to check for router outlets and router links 

// Note: it will throw an error if the routerTesting module is not defined. The router testing module is
// defined in the routing module it is simplified version and decoupled from browser. As firstly said the 
// router moudle has been in NgModule but the router module hasn't been specified in the test bed 
// so we use the routerTestingModule

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([])],
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('checking for the router outlet whether it has been modified or not placed',()=>{
    let de = fixture.debugElement.query(By.directive(RouterOutlet))
    expect(de).not.toBeNull();

  })


});
