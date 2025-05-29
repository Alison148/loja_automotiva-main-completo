import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `R$ ${value}`
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Vendas por Produto'
          }
        }
      }
    });
  }

  private createMonthlySalesChart(): void {
    if (this.chartMes) this.chartMes.destroy();

    const vendasPorMes: Record<string, number> = {};
    for (const v of this.vendas) {
      const data = new Date(v.data);
      const chaveMes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
      vendasPorMes[chaveMes] = (vendasPorMes[chaveMes] || 0) + v.valor;
    }

    const labels = Object.keys(vendasPorMes);
    const data = Object.values(vendasPorMes);
    const max = Math.max(...data);
    const min = Math.min(...data);
    const backgroundColors = data.map(v =>
      v === max ? '#4caf50' : v === min ? '#f44336' : '#2196f3'
    );

    const indexMax = data.indexOf(max);
    this.mesComMaisVendas = labels[indexMax];

    const ctx = this.canvasVendasMes.nativeElement.getContext('2d')!;
    this.chartMes = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Vendas por Mês (R$)',
          data,
          backgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `R$ ${value}`
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Vendas por Mês'
          }
        }
      }
    });
  }

  imprimir(): void {
    const element = this.dashboardContainer.nativeElement;

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const janela = window.open('', '_blank');
      if (janela) {
        janela.document.write(`
          <html>
            <head>
              <title>Imprimir Dashboard</title>
              <style>
                body { text-align: center; font-family: sans-serif; margin: 0; padding: 20px; }
                img { max-width: 100%; height: auto; }
              </style>
            </head>
            <body>
              <h2>Dashboard de Vendas</h2>
              <img src="${imgData}" />
              <script>
                window.onload = function() {
                  window.focus();
                  window.print();
                  window.close();
                };
              </script>
            </body>
          </html>
        `);
        janela.document.close();
      }
    });
  }
}
