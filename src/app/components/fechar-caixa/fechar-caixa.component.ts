import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fechar-caixa',
  templateUrl: './fechar-caixa.component.html',
  styleUrls: ['./fechar-caixa.component.css']
})
export class FecharCaixaComponent implements OnInit {
  totalVendidoHoje: number = 0;
  totalItensVendidosHoje: number = 0;
  vendas: any[] = [];

  operador: string = 'Alison Antunes';
  numeroCaixa: number = 1;

  ngOnInit(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
    this.calcularTotaisDoDia();
  }

  calcularTotaisDoDia(): void {
    const hoje = new Date().toDateString();
    this.totalVendidoHoje = 0;
    this.totalItensVendidosHoje = 0;

    for (const venda of this.vendas) {
      const dataVenda = new Date(venda.data).toDateString();
      if (dataVenda === hoje) {
        this.totalVendidoHoje += venda.valor;
        this.totalItensVendidosHoje += venda.quantidade || 1;
      }
    }
  }

  fecharCaixa(): void {
    if (confirm('Deseja realmente fechar o caixa?')) {
      const hoje = new Date().toDateString();
      const finalizadas = JSON.parse(localStorage.getItem('vendasFinalizadas') || '[]');

      const vendasHoje = this.vendas.filter((v: any) =>
        new Date(v.data).toDateString() === hoje
      );

      const vendasRestantes = this.vendas.filter((v: any) =>
        new Date(v.data).toDateString() !== hoje
      );

      localStorage.setItem('vendasFinalizadas', JSON.stringify([...finalizadas, ...vendasHoje]));
      localStorage.setItem('vendasRealizadas', JSON.stringify(vendasRestantes));

      alert(`✅ Caixa fechado por ${this.operador} . Vendas do dia foram finalizadas.`);
    }
  }

  salvarOperador(): void {
    alert(`🧑‍💼 Operador ${this.operador}  salvo com sucesso!`);
  }
}
