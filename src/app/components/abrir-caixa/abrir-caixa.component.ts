import { Component, OnInit } from '@angular/core';

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
    // Se quiser carregar dados salvos anteriormente
    const fundoSalvo = localStorage.getItem('fundoCaixa');
    if (fundoSalvo) {
      this.fundoCaixa = parseFloat(fundoSalvo);
    }
  }

  abrirCaixa(): void {
    if (!this.operador || this.fundoCaixa <= 0) {
      alert('⚠️ Informe o operador e o fundo de caixa.');
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

    alert(`✅ Caixa aberto com sucesso!\nOperador: ${this.operador}\nFundo: R$ ${this.fundoCaixa.toFixed(2)}`);
  }
}
