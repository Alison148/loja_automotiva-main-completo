import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendas',
  templateUrl: './venda.component.html'
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
    const caixa = localStorage.getItem('caixaAberto');
    this.caixaAberto = caixa === 'true';
  }

  vender(peca: any): void {
    if (!this.caixaAberto) {
      Swal.fire({
        icon: 'warning',
        title: 'Caixa Fechado',
        text: '❌ Você precisa abrir o caixa antes de vender!',
        confirmButtonText: 'OK'
      });
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

      const total = peca.preco * quantidade;
      this.valorParcela = this.formaPagamento === 'Cartão de Crédito' && this.parcelas > 1
        ? +(total / this.parcelas).toFixed(2)
        : total;

      this.ultimaVendaRealizada = {
        produto: peca.nome,
        preco: peca.preco,
        quantidade,
        valor: total,
        data: new Date()
      };

      this.mostrarToast(`✅ Venda de ${quantidade} unidade(s) realizada!`);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Estoque insuficiente!',
        text: '❌ Não há quantidade suficiente no estoque para esta venda.',
        confirmButtonText: 'OK'
      });
    }
  }

  salvarEstoque(): void {
    localStorage.setItem('pecas', JSON.stringify(this.pecasDisponiveis));
  }

  registrarVenda(peca: any, quantidade: number): void {
    const vendas = JSON.parse(localStorage.getItem('vendasRealizadas') || '[]');
    vendas.push({
      produto: peca.nome,
      preco: peca.preco,
      quantidade: quantidade,
      valor: peca.preco * quantidade,
      data: new Date().toISOString(),
      formaPagamento: this.formaPagamento
    });
    localStorage.setItem('vendasRealizadas', JSON.stringify(vendas));
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

  salvarRecarga(numero: string, valor: number): void {
    if (!this.caixaAberto) {
      Swal.fire({
        icon: 'warning',
        title: 'Caixa Fechado',
        text: '❌ Você precisa abrir o caixa antes de registrar uma recarga!',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!numero || valor <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Dados inválidos',
        text: '❌ Informe um número válido e um valor maior que zero!',
        confirmButtonText: 'OK'
      });
      return;
    }

    const vendasExistentes = JSON.parse(localStorage.getItem('vendasRealizadas') || '[]');

    const novaRecarga = {
      produto: `Recarga ${numero}`,
      preco: valor,
      quantidade: 1,
      valor: valor,
      data: new Date().toISOString(),
      formaPagamento: this.formaPagamento
    };

    vendasExistentes.push(novaRecarga);
    localStorage.setItem('vendasRealizadas', JSON.stringify(vendasExistentes));

    this.mostrarToast(`✅ Recarga de ${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} para ${numero} registrada!`);

    this.numeroRecarga = '';
    this.valorRecarga = 0;
  }

  logout(): void {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/']);
  }
}
