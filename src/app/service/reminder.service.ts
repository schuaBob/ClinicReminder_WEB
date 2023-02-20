import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  url = 'api/reminder'
  constructor(private http: HttpClient, private router: Router) { }
  createReminder(description: String, patient: number, duration: number, priority: String) {
    this.http.post(this.url, {
      description,
      patient,
      duration,
      priority
    }).subscribe({
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.router.navigateByUrl("/");
      }
    })
  }

}
