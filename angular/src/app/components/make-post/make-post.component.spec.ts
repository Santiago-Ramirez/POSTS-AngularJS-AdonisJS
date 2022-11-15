import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePostComponent } from './make-post.component';

describe('MakePostComponent', () => {
  let component: MakePostComponent;
  let fixture: ComponentFixture<MakePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
