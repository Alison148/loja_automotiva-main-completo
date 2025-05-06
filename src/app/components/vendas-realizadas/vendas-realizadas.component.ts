import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas-realizadas',
  templateUrl: './vendas-realizadas.component.html',
  styleUrls: ['./vendas-realizadas.component.css']
})
export class VendasRealizadasComponent implements OnInit {
  vendas: any[] = [];
  totalDia: number = 0;
  totalMes: number = 0;

  ngOnInit(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
    this.calcularTotais();
  }

  calcularTotais(): void {
    const hoje = new Date();
    this.totalDia = 0;
    this.totalMes = 0;

    for (const venda of this.vendas) {
      const dataVenda = new Date(venda.data);
      if (dataVenda.toDateString() === hoje.toDateString()) {
        this.totalDia += venda.valor;
      }
      if (
        dataVenda.getMonth() === hoje.getMonth() &&
        dataVenda.getFullYear() === hoje.getFullYear()
      ) {
        this.totalMes += venda.valor;
      }
    }
  }
}
