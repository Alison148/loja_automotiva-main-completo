import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  novaPeca = {
    nome: '',
    preco: 0,
    estoque: 1
  };

  precoFormatado: string = '';
  pecas: any[] = [];

  constructor() {
    const dados = localStorage.getItem('pecas');
    if (dados) {
      this.pecas = JSON.parse(dados);
    }
  }

  cadastrar(): void {
    if (!this.novaPeca.nome || !this.precoFormatado || this.novaPeca.estoque < 1) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Preencha todos os campos corretamente.',
        icon: 'warning'
      });
      return;
    }

    // Converte o preço formatado para número
    const precoLimpo = parseFloat(this.precoFormatado.replace(/\D/g, '')) / 100;

    const nova = {
      nome: this.novaPeca.nome,
      preco: precoLimpo,
      estoque: this.novaPeca.estoque
    };

    this.pecas.push(nova);
    localStorage.setItem('pecas', JSON.stringify(this.pecas));

    Swal.fire({
      title: 'Sucesso!',
      text: 'Peça cadastrada com sucesso!',
      icon: 'success'
    });

    // Limpa formulário
    this.novaPeca = { nome: '', preco: 0, estoque: 1 };
    this.precoFormatado = '';
  }

  formatarPreco(): void {
    const valor = this.precoFormatado.replace(/\D/g, '');
    const numero = (parseFloat(valor) / 100).toFixed(2);
    this.precoFormatado = `R$ ${numero.replace('.', ',')}`;
  }
}
