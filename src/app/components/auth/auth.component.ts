import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  loginMessage: string = '';
  isRegister: boolean = false;
  loggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.checkIfLoggedIn();
  }

  toggleMode(): void {
    this.isRegister = !this.isRegister;
    this.loginMessage = '';
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const email = this.authForm.value.email;

      if (this.isRegister) {
        // Simula registro de usuário
        localStorage.setItem('registeredUser', JSON.stringify(this.authForm.value));
        this.loginMessage = 'Usuário cadastrado com sucesso!';
        this.isRegister = false;
      } else {
        // Simula login
        const userData = localStorage.getItem('registeredUser');
        if (userData) {
          const user = JSON.parse(userData);
          if (
            user.email === this.authForm.value.email &&
            user.password === this.authForm.value.password
          ) {
            localStorage.setItem('loggedInUser', email);
            this.loginMessage = `Bem-vindo, ${email}!`;
            this.loggedIn = true;
            this.router.navigate(['/venda']); // ou '/dashboard'
          } else {
            this.loginMessage = 'Credenciais inválidas.';
          }
        } else {
          this.loginMessage = 'Nenhum usuário cadastrado.';
        }
      }
    }
  }

  checkIfLoggedIn(): void {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedIn = true;
      this.loginMessage = `Bem-vindo de volta, ${user}!`;
    }
  }
}
