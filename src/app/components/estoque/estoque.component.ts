import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit {
  pecas: any[] = [];

  ngOnInit(): void {
    this.carregarPecas();
  }

  carregarPecas(): void {
    const pecasSalvas = JSON.parse(localStorage.getItem('pecas') || '[]');
    this.pecas = pecasSalvas;
  }
}
