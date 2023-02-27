import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reminder } from '../models/reminder';


export interface ReminderRow {
  patient_id: number;
  pname: String;
  high: number;
  middle: number;
  low: number;
}
export interface ReminderHistory {
  date: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  url = 'api/doctor'
  constructor(private http: HttpClient, private router: Router) { }
  createReminder(description: String, patient: number, duration: number, priority: String) {
    this.http.post(`api/reminder`, {
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
  listReminders(): Observable<ReminderRow[]> {
    return this.http.get<ReminderRow[]>(`${this.url}/reminders`);
  }
  unFinishedReminders(patientId: number): Observable<ReminderHistory[]> {
    return this.http.get<ReminderHistory[]>(`${this.url}/reminders/history`, {
      params: {
        id: patientId
      }
    })
  }
}
