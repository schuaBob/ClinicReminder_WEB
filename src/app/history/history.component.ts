import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { ReminderService } from '../service/reminder.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public chart: any;
  constructor(private reminderService: ReminderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.reminderService.unFinishedReminders(Number.parseInt(params['patientId'])).subscribe({
        next: (element) => {
          const labels = element.map((val)=>{return val.date});
          const data = element.map((val)=>{return val.count});
          this.createChart(params['patientId'], labels, data)
        }
      })
    })
    
  }
  createChart(id: string,labels: string[], data: number[]) {
    this.chart = new Chart("barChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels, 
	       datasets: [
          {
            label: id,
            data: data,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}
