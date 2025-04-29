import { Component, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  vendas: any[] = [];
  chart: any;

  ngAfterViewInit(): void {
    this.carregarVendas();
    this.gerarGrafico();
  }

  carregarVendas(): void {
    this.vendas = JSON.parse(localStorage.getItem('vendas') || '[]');
  }

  gerarGrafico(): void {
    const produtosVendidos = this.vendas.reduce((acc: any, venda: any) => {
      acc[venda.produto] = (acc[venda.produto] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(produtosVendidos);
    const data = Object.values(produtosVendidos);

    this.chart = new Chart('vendasChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantidade Vendida',
          data: data,
          backgroundColor: 'rgba(13, 110, 253, 0.7)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  exportarPDF(): void {
    const elemento = document.getElementById('dashboard');
    html2pdf().from(elemento).save('relatorio-vendas.pdf');
  }
}
