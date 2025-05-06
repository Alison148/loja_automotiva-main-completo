import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cupom-fiscal',
  templateUrl: './cupom-fiscal.component.html',
  styleUrls: ['./cupom-fiscal.component.css']
})
export class CupomFiscalComponent implements OnInit {
  venda: any = null;
  totalGeral: number = 0;
  totalItens: number = 0;

  // Variáveis para exibir dados no cupom
  formaPagamento: string = '';
  parcelas: number = 1;
  valorParcela: number = 0;

  // Para recarga
  recargaOperadora: string = '';
  valorRecarga: number = 0;

  ngOnInit(): void {
    const dados = localStorage.getItem('ultimaVenda');
    if (dados) {
      this.venda = JSON.parse(dados);

      // Pega dados da venda
      this.formaPagamento = this.venda.formaPagamento || '';
      this.parcelas = this.venda.parcelas || 1;
      this.valorParcela = this.venda.valorParcela || 0;

      this.calcularTotais();
    }
  }

  calcularTotais(): void {
    this.totalGeral = 0;
    this.totalItens = 0;

    if (this.venda?.itens) {
      for (const item of this.venda.itens) {
        this.totalGeral += item.preco * item.quantidade;
        this.totalItens += item.quantidade;
      }
    }
  }

  realizarRecarga(): void {
    if (!this.recargaOperadora || !this.valorRecarga) {
      alert('Preencha os dados da recarga!');
      return;
    }

    alert(`Recarga de R$${this.valorRecarga} para ${this.recargaOperadora} realizada com sucesso!`);
  }

  imprimir(): void {
    window.print();
  }
}
