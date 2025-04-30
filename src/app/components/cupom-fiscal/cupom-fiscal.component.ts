import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cupom-fiscal',
  templateUrl: './cupom-fiscal.component.html',
  styleUrls: ['./cupom-fiscal.component.css']
})
export class CupomFiscalComponent {
  @Input() venda: any;
  @Input() formaPagamento: string = '';
  @Input() parcelas: number = 1;
  @Input() valorParcela: number = 0;

  recargaOperadora: string = '';
  valorRecarga: number = 0;

  imprimir(): void {
    window.print();
  }

  realizarRecarga(): void {
    if (!this.recargaOperadora || this.valorRecarga <= 0) {
      alert('Preencha a operadora e um valor válido para recarga!');
      return;
    }

    alert(`✅ Recarga de R$ ${this.valorRecarga} para ${this.recargaOperadora} solicitada com sucesso!`);
  }
}
