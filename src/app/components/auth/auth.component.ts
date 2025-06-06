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

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.marcarCamposComoTocados();
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Preencha todos os campos corretamente.'
      });
      return;
    }

    const { email, senha } = this.loginForm.value;

    // Simulação de autenticação
    if (email === 'admin@teste.com' && senha === '123456') {
      localStorage.setItem('usuarioLogado', 'true');

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
        icon: 'error',
        title: 'Falha ao entrar',
        text: 'E-mail ou senha inválidos.'
      });
    }
  }

  private marcarCamposComoTocados(): void {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
