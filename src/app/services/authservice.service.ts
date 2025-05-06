import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login, SignInResponse, SignUpResponse } from 'src/app/interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.API_URL;
  private readonly http = inject(HttpClient);

  isLoggedIn = signal(!!localStorage.getItem('boomeloToken'));

  signUp({ email, password }: Login) {
    return firstValueFrom(
      this.http.post<SignUpResponse>(`${this.baseUrl}signup`, {
        email,
        password,
      })
    );
  }

  signIn({ email, password }: Login) {
    return firstValueFrom(
      this.http.post<SignInResponse>(`${this.baseUrl}signin`, {
        email,
        password,
      })
    );
  }
}
