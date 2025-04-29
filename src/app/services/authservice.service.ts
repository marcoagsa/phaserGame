import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.API_URL;
  private readonly http = inject(HttpClient);

  isLoggedIn = signal(!!localStorage.getItem('boomeloToken'));

  login({ email, password }: Login) {
    return firstValueFrom(
      this.http.post<LoginResponse>(`${this.baseUrl}users/signin`, {
        email,
        password,
      })
    );
  }
}
