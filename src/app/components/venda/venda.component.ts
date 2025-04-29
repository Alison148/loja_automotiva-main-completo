import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html'
})
export class VendaComponent implements OnInit {
  pecasDisponiveis: any[] = [];
  caixaAberto: boolean = false;
  quantidadeSelecionada: { [key: string]: number } = {}; // Guarda a quantidade por produto

  ngOnInit(): void {
    this.carregarPecas();
    this.verificarCaixa();
  }

  carregarPecas(): void {
    const pecasSalvas = JSON.parse(localStorage.getItem('pecas') || '[]');
    this.pecasDisponiveis = pecasSalvas.filter((p: any) => p.estoque > 0);
  }

  verificarCaixa(): void {
    const caixa = localStorage.getItem('caixaAberto');
    this.caixaAberto = caixa === 'true';
  }

  vender(peca: any): void {
    if (!this.caixaAberto) {
      alert('❌ Você precisa abrir o caixa antes de vender!');
      return;
    }

    const quantidade = this.quantidadeSelecionada[peca.nome] || 1;

    if (peca.estoque >= quantidade) {
      peca.estoque -= quantidade;

      if (peca.estoque === 0) {
        this.pecasDisponiveis = this.pecasDisponiveis.filter(p => p !== peca);
      }

      this.salvarEstoque();
      this.registrarVenda(peca, quantidade);

      this.mostrarToast(`✅ Venda de ${quantidade} unidade(s) realizada!`);
    } else {
      alert('❌ Estoque insuficiente!');
    }
  }

  salvarEstoque(): void {
    localStorage.setItem('pecas', JSON.stringify(this.pecasDisponiveis));
  }

  registrarVenda(peca: any, quantidade: number): void {
    const vendas = JSON.parse(localStorage.getItem('vendas') || '[]');
    vendas.push({
      produto: peca.nome,
      preco: peca.preco,
      quantidade: quantidade,
      data: new Date()
    });
    localStorage.setItem('vendas', JSON.stringify(vendas));
  }

  mostrarToast(mensagem: string): void {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-success border-0 show';
    toast.style.position = 'fixed';
    toast.style.bottom = '1rem';
    toast.style.right = '1rem';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${mensagem}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}
