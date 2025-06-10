import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fechar-caixa',
  templateUrl: './fechar-caixa.component.html',
  styleUrls: ['./fechar-caixa.component.css']
})
export class FecharCaixaComponent implements OnInit {
  totalVendidoHoje: number = 0;
  totalItensVendidosHoje: number = 0;
  vendas: any[] = [];

  operador: string = 'Alison Antunes';
  numeroCaixa: number = 1;

  ngOnInit(): void {
    const dados = localStorage.getItem('vendasRealizadas');
    this.vendas = dados ? JSON.parse(dados) : [];
    this.calcularTotaisDoDia();
  }

  calcularTotaisDoDia(): void {
    const hoje = new Date().toDateString();
    this.totalVendidoHoje = 0;
    this.totalItensVendidosHoje = 0;

    for (const venda of this.vendas) {
      const dataVenda = new Date(venda.data).toDateString();
      if (dataVenda === hoje) {
        this.totalVendidoHoje += venda.valor;
        this.totalItensVendidosHoje += venda.quantidade || 1;
      }
    }this.vendas = this.vendas.filter((v: any) => new Date(v.data).toDateString() === hoje);
    this.vendas = this.vendas.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());  
    
  }

  fecharCaixa(): void {
    Swal.fire({
      title: 'Deseja realmente fechar o caixa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const hoje = new Date().toDateString();
        const finalizadas = JSON.parse(localStorage.getItem('vendasFinalizadas') || '[]');

        const vendasHoje = this.vendas.filter((v: any) =>
          new Date(v.data).toDateString() === hoje
        );

        const vendasRestantes = this.vendas.filter((v: any) =>
          new Date(v.data).toDateString() !== hoje
        );

        localStorage.setItem('vendasFinalizadas', JSON.stringify([...finalizadas, ...vendasHoje]));
        localStorage.setItem('vendasRealizadas', JSON.stringify(vendasRestantes));

        Swal.fire(
          'Caixa fechado!',
          `✅ Caixa fechado por ${this.operador}. Vendas do dia foram finalizadas.`,
          'success'
        ).then(() => {
          location.reload(); // Atualiza a página automaticamente
        });
      }
    });
  }

  salvarOperador(): void {
    Swal.fire({
      icon: 'success',
      title: 'Operador salvo',
      text: `🧑‍💼 Operador ${this.operador} salvo com sucesso!`
    });
  }
}  
// Fim do código do componente Fechar Caixa
// Este componente é responsável por fechar o caixa, calcular os totais do dia e salvar o operador.
// Ele utiliza o SweetAlert2 para exibir mensagens de confirmação e sucesso.
// As vendas são armazenadas no localStorage e filtradas por data para calcular os totais do dia. 
// O operador e o número do caixa são definidos no início e podem ser salvos com um alerta de sucesso.
// O método fecharCaixa() finaliza as vendas do dia e atualiza o localStorage, enquanto o método salvarOperador() exibe uma mensagem de sucesso ao salvar o operador.
// O componente também ordena as vendas do dia por data, exibindo as mais recentes primeiro.
// Ele é inicializado com os dados do localStorage e calcula os totais do dia ao ser carregado.
// O componente é estilizado com um arquivo CSS separado e utiliza o template HTML para exibir as informações de fechamento de caixa.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente. 
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.
// O componente é parte de um sistema de gerenciamento de vendas, onde o operador pode fechar o caixa e visualizar as vendas do dia.
// Ele é projetado para ser simples e funcional, permitindo que o operador finalize o dia de trabalho de forma eficiente.