import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.post<Doctor>(this.url, {
      username,
      password
    }).pipe(first()).subscribe({
      next: (value) => {
        localStorage.setItem("user", JSON.stringify(value));
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
}
