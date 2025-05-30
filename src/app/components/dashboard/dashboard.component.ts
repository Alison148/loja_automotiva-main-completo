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
  @ViewChild('dashboardContainer', { static: false }) dashboardContainer!: ElementRef;

  vendas: any[] = [];
  private chartProduto: any;

  ngOnInit(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
  }

  ngAfterViewInit(): void {
    this.createProductSalesChart(); // Começa com o gráfico simples
  }

  createProductSalesChart(): void {
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
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  createProductChartFromItens(): void {
    if (this.chartProduto) this.chartProduto.destroy();

    const ctx = this.canvasVendas.nativeElement.getContext('2d');
    const vendasPorProduto = this.vendas.reduce((acc: any, venda: any) => {
      if (venda.itens && Array.isArray(venda.itens)) {
        venda.itens.forEach((item: any) => {
          acc[item.nome] = (acc[item.nome] || 0) + item.subtotal;
        });
      }
      return acc;
    }, {});

    const nomes = Object.keys(vendasPorProduto);
    const totais = Object.values(vendasPorProduto);

    const cores = nomes.map((_, i) => {
      if (i === 1) return '#ff4d4f'; // vermelho
      if (i === nomes.length - 1) return '#52c41a'; // verde
      return '#1890ff'; // azul
    });

    this.chartProduto = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: nomes,
        datasets: [{
          label: 'Vendas por Produto (Itens)',
          data: totais,
          backgroundColor: cores,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  imprimirDashboard(): void {
    html2canvas(this.dashboardContainer.nativeElement).then(canvas => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      printWindow.document.write('<html><head><title>Impressão Dashboard</title></head><body>');
      printWindow.document.body.appendChild(canvas);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    });
  }
}
