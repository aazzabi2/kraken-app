import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadComponent } from './data-upload.component';
import { provideHttpClient } from '@angular/common/http';

describe('DataUploadComponent', () => {
  let component: DataUploadComponent;
  let fixture: ComponentFixture<DataUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataUploadComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(DataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
