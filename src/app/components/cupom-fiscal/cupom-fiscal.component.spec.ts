import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupomFiscalComponent } from './cupom-fiscal.component';

describe('CupomFiscalComponent', () => {
  let component: CupomFiscalComponent;
  let fixture: ComponentFixture<CupomFiscalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CupomFiscalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CupomFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
