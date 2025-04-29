import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas-realizadas',
  templateUrl: './vendas-realizadas.component.html'
})
export class VendasRealizadasComponent implements OnInit {
  vendas: any[] = [];

  ngOnInit(): void {
    this.carregarVendas();
  }

  carregarVendas(): void {
    this.vendas = JSON.parse(localStorage.getItem('vendas') || '[]');
  }
}
