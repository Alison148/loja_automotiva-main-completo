import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          this.authService.saveSession(res.token, res.email);
          this.router.navigate(['/venda']);
        },
        error: (err) => {
          alert('Login inválido');
        }
      });
    }
  }

  cancel(): void {
    this.authForm.reset();
  }
}
