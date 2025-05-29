import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abrir-caixa',
  templateUrl: './abrir-caixa.component.html',
  styleUrls: ['./abrir-caixa.component.css']
})
export class AbrirCaixaComponent implements OnInit {
  operador: string = '';
  numeroCaixa: number = 1;
  fundoCaixa: number = 0;

  ngOnInit(): void {
    const fundoSalvo = localStorage.getItem('fundoCaixa');
    if (fundoSalvo) {
      this.fundoCaixa = parseFloat(fundoSalvo);
    }
  }

  abrirCaixa(): void {
    if (!this.operador || this.fundoCaixa <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obrigatórios!',
        text: 'Informe o operador e o fundo de caixa.',
        confirmButtonText: 'OK'
      });
      return;
    }

    const dados = {
      operador: this.operador,
      numeroCaixa: this.numeroCaixa,
      fundoCaixa: this.fundoCaixa,
      dataHora: new Date().toISOString()
    };

    localStorage.setItem('caixaAberto', 'true');
    localStorage.setItem('dadosCaixa', JSON.stringify(dados));

    Swal.fire({
      icon: 'success',
      title: 'Caixa aberto com sucesso!',
      html: `
        <p><strong>Operador:</strong> ${this.operador}</p>
        <p><strong>Fundo:</strong> R$ ${this.fundoCaixa.toFixed(2)}</p>
      `,
      confirmButtonText: 'OK'
    });
  }
}
