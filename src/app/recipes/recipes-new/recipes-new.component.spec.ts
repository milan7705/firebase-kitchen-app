import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesNewComponent } from './recipes-new.component';

describe('RecipesNewComponent', () => {
  let component: RecipesNewComponent;
  let fixture: ComponentFixture<RecipesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
