import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([])],
      declarations: [ NavComponent ],
      // if we have any errors with the child components declaration that the testing module has any
      // unidentified (undeclared) directives or components or child components we can use
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have todo link'  , () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref))
    let index = debugElements.findIndex(de=>de.properties['href']=='/todos')
    expect(index).toBeGreaterThan(-1)
  });
});
