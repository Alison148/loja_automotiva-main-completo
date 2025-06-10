import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  usuarioLogado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
    // Verifica se já está logado
    this.usuarioLogado = localStorage.getItem('usuarioLogado') === 'true';
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.marcarCamposComoTocados();
      Swal.fire({
        icon: 'info',
        title: 'Atenção',
        text: 'Por favor, preencha todos os campos antes de continuar.'
      });
      return;
    }

    const { email, senha } = this.loginForm.value;

    // Simulação de autenticação
    if (email === 'admin@teste.com' && senha === '123456') {
      localStorage.setItem('usuarioLogado', 'true');
      this.usuarioLogado = true;

      Swal.fire({
        icon: 'success',
        title: 'Login realizado',
        text: 'Bem-vindo!',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/dashboard']);
      });

    } else {
      Swal.fire({
        icon: 'info',
        title: 'Atenção',
        text: 'E-mail ou senha incorretos. Por favor, verifique e tente novamente.'
      });
    }
  }

  logoff(): void {
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogado = false;
    this.loginForm.reset();
    Swal.fire({
      icon: 'info',
      title: 'Sessão encerrada',
      text: 'Você saiu do sistema.'
    });
    // Volta para login (opcional)
    this.router.navigate(['/login']);
  }

  private marcarCamposComoTocados(): void {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
