import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImgComponent } from './profile-img.component';

describe('ProfileImgComponent', () => {
  let component: ProfileImgComponent;
  let fixture: ComponentFixture<ProfileImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
