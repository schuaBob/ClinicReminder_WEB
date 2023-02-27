import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from '../models/patients';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private url = 'api';
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  listPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.url}/doctor/patients`)
  }

}
