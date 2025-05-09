// dashboard.component.ts
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';  // já registra tudo por você

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('graficoVendasProduto', { static: true })
  canvasVendas!: ElementRef<HTMLCanvasElement>;

  vendas: any[] = [];

  ngOnInit(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
  }

  ngAfterViewInit(): void {
    this.createProductSalesChart();
  }

  private createProductSalesChart() {
    // agrupa valores
    const vendasPorProduto: Record<string, number> = {};
    for (const v of this.vendas) {
      const nome = v.produto ?? 'Produto Desconhecido';
      vendasPorProduto[nome] = (vendasPorProduto[nome] || 0) + v.valor;
    }

    const labels = Object.keys(vendasPorProduto);
    const data   = Object.values(vendasPorProduto);

    // pega o contexto 2D do canvas
    const ctx = this.canvasVendas.nativeElement.getContext('2d')!;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Vendas por Produto (R$)',
          data,
          borderColor: '#4caf50',
          backgroundColor: 'rgba(17, 0, 248, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
        plugins: {
          title: {
            display: true,
            text: 'Vendas por Produto'
          }
        }
      }
    });
  }
}
