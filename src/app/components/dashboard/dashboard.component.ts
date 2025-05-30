import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('graficoVendasProduto', { static: true }) canvasVendas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficoVendasMes', { static: true }) canvasVendasMes!: ElementRef<HTMLCanvasElement>;
  @ViewChild('dashboardContainer', { static: false }) dashboardContainer!: ElementRef;

  vendas: any[] = [];
  private chartProduto: any;
  private chartMes: any;

  mesComMaisVendas: string = '';

  ngOnInit(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
  }

  ngAfterViewInit(): void {
    this.createProductSalesChart();
    this.createMonthlySalesChart();
  }

  private createProductSalesChart(): void {
    if (this.chartProduto) this.chartProduto.destroy();

    const vendasPorProduto: Record<string, number> = {};
    for (const v of this.vendas) {
      const nome = v.produto ?? 'Produto Desconhecido';
      vendasPorProduto[nome] = (vendasPorProduto[nome] || 0) + v.valor;
    }

    const labels = Object.keys(vendasPorProduto);
    const data = Object.values(vendasPorProduto);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const backgroundColors = data.map(v =>
      v === max ? '#4caf50' : v === min ? '#f44336' : '#2196f3'
    );

    const ctx = this.canvasVendas.nativeElement.getContext('2d')!;
    this.chartProduto = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Vendas por Produto (R$)',
          data,
          backgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  private createMonthlySalesChart(): void {
    const agrupadoPorMes: { [mes: string]: number } = {};

    this.vendas.forEach(venda => {
      const data = new Date(venda.data);
      const mes = data.toLocaleString('default', { month: 'long' });
      if (!agrupadoPorMes[mes]) {
        agrupadoPorMes[mes] = 0;
      }
      agrupadoPorMes[mes] += venda.total;
    });

    const meses = Object.keys(agrupadoPorMes);
    const totais = Object.values(agrupadoPorMes);

    new Chart(this.chartMes.nativeElement, {
      type: 'line',
      data: {
        labels: meses,
        datasets: [{
          label: 'Total Vendido por Mês (R$)',
          data: totais,
          fill: false,
          borderColor: 'green',
          tension: 0.3
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  imprimirDashboard(): void {
    window.print();
  }
}
