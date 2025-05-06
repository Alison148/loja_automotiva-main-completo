// src/app/components/cupom-fiscal/cupom.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <- Necessário para ngModel
import { CupomFiscalComponent } from './cupom-fiscal.component';

@NgModule({
  declarations: [
    CupomFiscalComponent
  ],
  imports: [
    CommonModule,  // <- Necessário para pipes como currency e date
    FormsModule    // <- Necessário para ngModel, input, select etc
  ],
  exports: [
    CupomFiscalComponent
  ]
})
export class CupomModule {}  
