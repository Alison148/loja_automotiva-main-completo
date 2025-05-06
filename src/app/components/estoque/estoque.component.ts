import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html'
})
export class EstoqueComponent implements OnInit {
  pecas: any[] = [];
  novaQuantidade: { [key: string]: number } = {};

  ngOnInit(): void {
    this.carregarEstoque();
  }

  carregarEstoque(): void {
    const dados = JSON.parse(localStorage.getItem('pecas') || '[]');
    this.pecas = dados;
  }

  salvarEstoque(): void {
    localStorage.setItem('pecas', JSON.stringify(this.pecas));
    this.carregarEstoque();
  }

  adicionarQuantidade(index: number): void {
    const id = this.pecas[index].nome;
    const qtd = this.novaQuantidade[id];

    if (!qtd || qtd <= 0) return;

    this.pecas[index].estoque += qtd;
    this.novaQuantidade[id] = 0;

    this.salvarEstoque();
  }

  venderItem(index: number): void {
    if (this.pecas[index].estoque > 0) {
      this.pecas[index].estoque--;

      this.salvarEstoque();
    }
  }

  get pecasComEstoque(): any[] {
    return this.pecas.filter(p => p.estoque > 0);
  }

  get pecasZeradas(): any[] {
    return this.pecas.filter(p => p.estoque === 0);
  }
}
