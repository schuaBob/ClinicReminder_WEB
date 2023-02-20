import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ReminderRow, ReminderService } from '../service/reminder.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.css']
})

@ViewChild(DashboardComponent)
export class ReminderListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'high', 'middle', 'low'];
  dataSource: ReminderRow[] = [];

  
  constructor(private reminderService: ReminderService, private route: Router) { }

  ngOnInit(): void {
    this.reminderService.listReminders().subscribe({
      next: (value) => {
        this.dataSource = value;
      },
    })
  }
  showDetails(id: number) {
    this.route.navigateByUrl(`/reminder/${id}/history`);
  }

}
