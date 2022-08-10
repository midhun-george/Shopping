import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlistComponent } from './slist.component';

describe('SlistComponent', () => {
  let component: SlistComponent;
  let fixture: ComponentFixture<SlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
