import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent {
  novaPeca = {
    nome: '',
    preco: 0,
    estoque: 0
  };

  cadastrar(): void {
    const pecasSalvas = JSON.parse(localStorage.getItem('pecas') || '[]');

    pecasSalvas.push({ ...this.novaPeca });
    localStorage.setItem('pecas', JSON.stringify(pecasSalvas));

    alert('✅ Peça cadastrada com sucesso!');

    this.novaPeca = {
      nome: '',
      preco: 0,
      estoque: 0
    };
  }
}
