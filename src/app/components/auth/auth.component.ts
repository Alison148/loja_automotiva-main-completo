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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      Swal.fire('Erro', 'Preencha os campos corretamente.', 'error');
      return;
    }

    const { email, senha } = this.loginForm.value;

    // Simulação de login
    if (email === 'admin@teste.com' && senha === '123456') {
      // 1. Salvar login no localStorage
      localStorage.setItem('usuarioLogado', 'true');

      // 2. Redirecionar para uma rota protegida
      Swal.fire('Sucesso', 'Login efetuado com sucesso!', 'success').then(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      Swal.fire('Falha', 'Usuário ou senha inválidos.', 'error');
    }
  }
}
