import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DeparturesComponent } from './departures.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('DeparturesComponent', () => {
  let fixture: ComponentFixture<DeparturesComponent>;
  let component: DeparturesComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeparturesComponent,
        FormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeparturesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger search and get departures from API', () => {
    component.stationName = 'Lausanne';
    component.search();

    const req = httpMock.expectOne(`http://localhost:8080/api/station/Lausanne`);
    expect(req.request.method).toBe('GET');

    req.flush({ stationboard: [
      { name: 'IC1', to: 'Geneva', stop: { departure: new Date().toISOString() } }
    ]});

    expect(component.departures?.length).toBe(1);
  });

  it('should show errorMessage if API fails', () => {
    component.stationName = 'Invalid';
    component.search();

    const req = httpMock.expectOne(`http://localhost:8080/api/station/Invalid`);
    req.error(new ErrorEvent('Network error'), { status: 500 });

    expect(component.errorMessage).toBeTruthy();
    fixture.detectChanges();

    const errorEl: DebugElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain(component.errorMessage);
  });
});
