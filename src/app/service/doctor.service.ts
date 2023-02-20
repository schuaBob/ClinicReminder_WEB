import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../models/patients';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private url = 'api';
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  listPatients(id: number) {

    this.http.get<Patient[]>(`${this.url}/list/patients/${id}`).subscribe({
      next : (value) => {
        console.log(value)
      }
    })
  }

}
