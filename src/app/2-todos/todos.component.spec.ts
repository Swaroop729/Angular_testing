/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodosComponent } from './todos.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
import { from } from 'rxjs';


//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below. 

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
// importing the http module and the providers since the todo service is used
// Note : we can have a signleton service when declared in providers array for app module or Ngmodule but 
// at the same time if we can want it for the single module or single component we can do that to
      imports:[HttpClientModule],
      declarations: [ TodosComponent ],
      providers:[TodoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;

    // we can get the service instance usign the fixture 
    fixture.debugElement.injector.get(TodoService);

    // or else we can get the service using the testbed

  });

  it('should create todos component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch todos from the server', () => {
    let Service = TestBed.get(TodoService);

//works on js collections
// const map = new Map();
// map.set(1,2);

const mapSource = from([1,2]);
    spyOn(Service , 'getTodos').and.returnValue(mapSource.subscribe(val=>{val}))

    fixture.detectChanges();
    expect(component.todos.length).toBe(2)
  });


  it('should fetch todos from the server using promise, Async, whenStable - change how function is called in ts', async(() => {
    let Service = TestBed.get(TodoService);
    const mapSource = from([1,2]);
    spyOn(Service , 'getTodosPromise').and.returnValue(mapSource.subscribe(val=>{val}))

    fixture.detectChanges();

    fixture.whenStable().then(()=>{
      expect(component.todos.length).toBe(2)
    })
  }));

  // Another approach using the promise could be handled using the FakeAsync and tick function while the
  // tick functions reminds us to when the async functions have been completed.
  it('fetch todos from the server using promise,FakeAsync and tick - change how function is called in ts', fakeAsync(() => {
    let Service = TestBed.get(TodoService);
    const mapSource = from([1,2]);
    spyOn(Service , 'getTodosPromise').and.returnValue(mapSource.subscribe(val=>{val}))

    fixture.detectChanges();

      tick()
      expect(component.todos.length).toBe(2)
  }));

});
