import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('graficoBarra', { static: true }) canvasBarra!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoLinha', { static: true }) canvasLinha!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoProduto', { static: true }) canvasProduto!: ElementRef<HTMLCanvasElement>;

  vendas: any[] = [];
  chartBarra: any;
  chartLinha: any;
  chartProduto: any;

  totalVendas = 0;
  totalProdutosVendidos = 0;
  produtoMaisVendido = { nome: '', quantidade: 0 };

  ngOnInit(): void {
    this.carregarVendas();
    this.calcularTotais();
    this.produtoMaisVendido = this.getProdutoMaisVendido();
  }

  ngAfterViewInit(): void {
    this.gerarGraficoBarra();
    this.gerarGraficoLinha();
    this.gerarGraficoProduto();
  }

  carregarVendas(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
  }

  calcularTotais(): void {
    this.totalVendas = this.vendas.reduce((acc, v) => acc + v.valor, 0);
    this.totalProdutosVendidos = this.vendas.reduce((acc, v) => acc + v.quantidade, 0);
  }

  agruparVendasPorData(): Record<string, number> {
    const agrupadas: Record<string, number> = {};
    for (const venda of this.vendas) {
      const data = new Date(venda.data).toLocaleDateString();
      agrupadas[data] = (agrupadas[data] || 0) + venda.valor;
    }
    return agrupadas;
  }

  agruparVendasPorProduto(): Record<string, number> {
    const agrupadas: Record<string, number> = {};
    for (const venda of this.vendas) {
      agrupadas[venda.produto] = (agrupadas[venda.produto] || 0) + venda.quantidade;
    }
    return agrupadas;
  }

  gerarGraficoBarra(): void {
    const dados = this.agruparVendasPorData();
    const labels = Object.keys(dados);
    const valores = Object.values(dados);

    if (this.chartBarra) this.chartBarra.destroy();
    this.chartBarra = new Chart(this.canvasBarra.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '💰 Vendas por Dia (R$)',
          data: valores,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `R$ ${value}`
            }
          }
        }
      }
    });
  }

  gerarGraficoLinha(): void {
    const dados = this.agruparVendasPorData();
    const labels = Object.keys(dados);
    const valores = Object.values(dados);

    if (this.chartLinha) this.chartLinha.destroy();
    this.chartLinha = new Chart(this.canvasLinha.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '📈 Evolução das Vendas (R$)',
          data: valores,
          fill: false,
          borderColor: 'rgb(245, 8, 107)',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `R$ ${value}`
            }
          }
        }
      }
    });
  }

  gerarGraficoProduto(): void {
    const dados = this.agruparVendasPorProduto();
    const labels = Object.keys(dados);
    const valores = Object.values(dados);

    if (this.chartProduto) this.chartProduto.destroy();
    this.chartProduto = new Chart(this.canvasProduto.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '📦 Quantidade Vendida por Produto',
          data: valores,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  getProdutoMaisVendido(): { nome: string, quantidade: number } {
    const contagem: Record<string, number> = {};
    for (const venda of this.vendas) {
      contagem[venda.produto] = (contagem[venda.produto] || 0) + venda.quantidade;
    }

    let maisVendido = '';
    let maiorQuantidade = 0;

    for (const produto in contagem) {
      if (contagem[produto] > maiorQuantidade) {
        maisVendido = produto;
        maiorQuantidade = contagem[produto];
      }
    }

    return { nome: maisVendido, quantidade: maiorQuantidade };
  }
}
