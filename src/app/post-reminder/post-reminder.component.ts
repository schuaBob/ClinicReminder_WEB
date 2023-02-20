import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Patient } from '../models/patients';
import { DoctorService } from '../service/doctor.service';
import { ReminderService } from '../service/reminder.service';

@Component({
  selector: 'app-post-reminder',
  templateUrl: './post-reminder.component.html',
  styleUrls: ['./post-reminder.component.css']
})
export class PostReminderComponent implements OnInit {
  addressForm = this.fb.group({
    description: [null, Validators.required],
    patient: [null, Validators.required],
    duration: [null, Validators.required],
    priority: [null, Validators.required]
  });

  priorities = [
    "HIGH",
    "MIDDLE",
    "LOW"
  ]

  patients: Patient[] = [];

  constructor(private fb: FormBuilder, private doctorService: DoctorService, private reminderService: ReminderService) { }

  ngOnInit(): void {
    this.doctorService.listPatients().subscribe({
      next: (value) => {
        this.patients = value
      }
    });
  }

  onSubmit(): void {
    this.reminderService.createReminder(
      this.addressForm.value['description'],
      Number.parseInt(this.addressForm.value['patient']),
      Number.parseInt(this.addressForm.value['duration']),
      this.addressForm.value['priority']
    )
  }
}
