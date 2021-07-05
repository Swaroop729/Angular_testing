import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {

let fixture : ComponentFixture<VoterComponent>;
let component : VoterComponent;
let debugElement : DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[VoterComponent]
    })

     fixture = TestBed.createComponent(VoterComponent);
     component  = fixture.componentInstance;
     debugElement = fixture.debugElement;
  });

  it('Manual Testing of Voter component', () => {
    //checking whether the component has been created or not I hope this comes as the default test with cli
    expect(component).toBeTruthy();
  });

  it('rendering total votes',()=>{
    component.othersVote = 121;
    component.myVote = 2;

    // If the button clicks are happening outside the testing environment the anuglar runs the change
    // detection mechanism every time to identify the changes occured in application but since we are 
    // running the application in the test bed envrionment we need to manually trigger the change 
    // detection mechanism using
    fixture.detectChanges()

    // We can use the By operator to query the debug elements which we got from the component instance
    let de = debugElement.query( By.css('.vote-count'))

    // In order to access some properties such as Inner html or Inner text we need to have the native element
    // from the debug element. Also we need to type convert it to the HTML Element since the native element
    // property is of type any in order to get intellisense we are converting it to HTML element

    // Note : Debug element is a wrapper around the native element which contains the dom elements of html
    let el:HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('123');
  })

  it('upvoting voter button and checking for upvote highlighted class',()=>{
    component.myVote = 1;
    fixture.detectChanges()

    let de  = debugElement.query(By.css('.glyphicon-menu-up'))

    expect(de.classes['highlighted']).toBeTruthy()
  })

  it('upovting the total votes by clicking on upvote button - Integration Test',()=>{

    let de  = debugElement.query(By.css('.glyphicon-menu-up'))

    // here the null refers to object which we send while clicking a button as of now we are sending it as null
    // Since it is integration testing we are calling the click event on the upvote button as below
    de.triggerEventHandler('click',null)
    fixture.detectChanges()

    expect(component.totalVotes).toBe(1)
  })

  it('upovting the total votes by clicking on upvote button - Unit Test',()=>{

    let de  = debugElement.query(By.css('.glyphicon-menu-up'))
    // In unit test instead of calling through html as in Integration test we call the method in .ts
    component.upVote()
    fixture.detectChanges()

    expect(component.totalVotes).toBe(1)
  })
});
