import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendas',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {
  pecasDisponiveis: any[] = [];
  caixaAberto: boolean = false;
  quantidadeSelecionada: { [key: string]: number } = {};

  ultimaVendaRealizada: any = null;
  formaPagamento: string = 'Dinheiro';
  parcelas: number = 1;
  valorParcela: number = 0;

  numeroRecarga: string = '';
  valorRecarga: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarPecas();
    this.verificarCaixa();
  }

  carregarPecas(): void {
    const pecasSalvas = JSON.parse(localStorage.getItem('pecas') || '[]');
    this.pecasDisponiveis = pecasSalvas.filter((p: any) => p.estoque > 0);
  }

  verificarCaixa(): void {
    this.caixaAberto = localStorage.getItem('caixaAberto') === 'true';
  }

  vender(peca: any): void {
    if (!this.caixaAberto) {
      return this.alerta('Caixa Fechado', '❌ Você precisa abrir o caixa antes de vender!', 'warning');
    }

    const quantidade = this.quantidadeSelecionada[peca.nome] || 1;

    if (quantidade <= 0 || isNaN(quantidade)) {
      return this.alerta('Quantidade inválida', '❌ A quantidade deve ser maior que 0!', 'error');
    }

    if (peca.estoque < quantidade) {
      return this.alerta('Estoque insuficiente!', '❌ Não há quantidade suficiente no estoque.', 'error');
    }

    const total = peca.preco * quantidade;
    const valorParcela = this.formaPagamento === 'Cartão de Crédito' && this.parcelas > 1
      ? +(total / this.parcelas).toFixed(2)
      : total;

    // Atualiza estoque
    peca.estoque -= quantidade;
    if (peca.estoque === 0) {
      this.pecasDisponiveis = this.pecasDisponiveis.filter(p => p !== peca);
    }
    this.salvarEstoque();

    // Registra venda
    this.registrarVenda({
      produto: peca.nome,
      preco: peca.preco,
      quantidade,
      valor: total,
      data: new Date().toISOString(),
      formaPagamento: this.formaPagamento,
      parcelas: this.parcelas,
      valorParcela
    });

    this.ultimaVendaRealizada = {
      produto: peca.nome,
      preco: peca.preco,
      quantidade,
      valor: total,
      data: new Date(),
      formaPagamento: this.formaPagamento,
      parcelas: this.parcelas,
      valorParcela
    };

    this.mostrarToast(`✅ Venda de ${quantidade}x ${peca.nome} registrada (${this.formaPagamento}${this.parcelas > 1 ? ` em ${this.parcelas}x de R$ ${valorParcela}` : ''})`);

    // Limpa campos
    delete this.quantidadeSelecionada[peca.nome];
    this.parcelas = 1;
    this.valorParcela = 0;
  }

  registrarVenda(venda: any): void {
    const vendas = JSON.parse(localStorage.getItem('vendasRealizadas') || '[]');
    vendas.push(venda);
    localStorage.setItem('vendasRealizadas', JSON.stringify(vendas));
  }

  salvarEstoque(): void {
    localStorage.setItem('pecas', JSON.stringify(this.pecasDisponiveis));
  }

  salvarRecarga(numero: string, valor: number): void {
    if (!this.caixaAberto) {
      return this.alerta('Caixa Fechado', '❌ Você precisa abrir o caixa antes de registrar uma recarga!', 'warning');
    }

    if (!numero || valor <= 0) {
      return this.alerta('Dados inválidos', '❌ Informe um número válido e valor maior que zero.', 'error');
    }

    this.registrarVenda({
      produto: `Recarga ${numero}`,
      preco: valor,
      quantidade: 1,
      valor: valor,
      data: new Date().toISOString(),
      formaPagamento: this.formaPagamento
    });

    this.mostrarToast(`✅ Recarga de R$ ${valor.toFixed(2)} para ${numero} registrada!`);
    this.numeroRecarga = '';
    this.valorRecarga = 0;
  }

  mostrarToast(mensagem: string): void {
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-success border-0 show';
    toast.style.position = 'fixed';
    toast.style.bottom = '1rem';
    toast.style.right = '1rem';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${mensagem}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  alerta(titulo: string, texto: string, icone: any): void {
    Swal.fire({
      icon: icone,
      title: titulo,
      text: texto,
      confirmButtonText: 'OK'
    });
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/']);
  }
}
