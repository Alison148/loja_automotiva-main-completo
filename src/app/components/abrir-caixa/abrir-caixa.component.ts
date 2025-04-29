import { Component } from '@angular/core';

@Component({
  selector: 'app-abrir-caixa',
  templateUrl: './abrir-caixa.component.html'
})
export class AbrirCaixaComponent {
  abrirCaixa(): void {
    localStorage.setItem('caixaAberto', 'true');
    alert('✅ Caixa aberto com sucesso!');
  }
}
