import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface AuthCredentials {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(credentials: AuthCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: AuthCredentials): Observable<any> {
    // return this.http.post(`${this.apiUrl}/login`, credentials);
    const credencial ={
  "token": "SEU_TOKEN_AQUI",
  "email": "seu_email@exemplo.com"
};
return of(credencial)
  }

  saveSession(token: string, email: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
