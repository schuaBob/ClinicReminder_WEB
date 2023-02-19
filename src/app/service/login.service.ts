import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { first } from 'rxjs/operators';

import { Doctor } from '../models/doctor';

import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'auth/signin';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  signin(username: string, password: string) {
    return this.http.post<Doctor>(this.url, {
      username,
      password
    }).pipe(first()).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error) => {
        console.error(error)
      }
    });
  }
}
