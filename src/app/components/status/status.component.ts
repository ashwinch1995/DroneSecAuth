import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Point, BarController, BarElement } from 'chart.js';
// import { Chart, Point } from 'chart.js';
import { mission } from 'src/app/interfaces/mission';
import { user } from 'src/app/interfaces/user';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  missions: mission[] = [];
  displayedColumns: string[] = ['droneId', 'trustScore', 'trusted'];
  panelOpenState = false;

  private chart!: Chart;
  private data: Point[];
  displayChart: boolean = false;
  energyLevelDroneId: string = '';
  
  constructor(public element: ElementRef) {
    this.data = [{x: 1, y: 5}, {x: 2, y: 10}, {x: 3, y: 6}, {x: 4, y: 2}, {x: 4.1, y: 6}];
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, BarController, BarElement);
  }

  ngOnInit(): void {
    
    let mission: mission = {
      missionId: 'm1',
      missionName: 'Disaster Management',
      droneIds: [
        {
          droneId: 'd1',
          trustScore: 1,
          energyLevel: [100,90,85,80,70,65,50,45,40,40,40,0]
        },
        {
          droneId: 'd3',
          trustScore: 0.2,
          energyLevel: [100,90,85,80,0]
        }
      ],
      source: 's1',
      destination: 'd1',
      status: 'active'
    };

    this.missions.push(mission);

    mission = {
      missionId: 'm2',
      missionName: 'Footage',
      droneIds: [
        {
          droneId: 'd2',
          trustScore: 0.8,
          energyLevel: [100,90,85,80,70,60,40,30,25,25,25,0]
        },
        {
          droneId: 'd3',
          trustScore: 0.2,
          energyLevel: [100,90,85,80,0]
        }
      ],
      source: 's2',
      destination: 'd2',
      status: 'completed'
    };

    this.missions.push(mission);

    mission = {
      missionId: 'm3',
      missionName: 'Traffic Management',
      droneIds: [
        {
          droneId: 'd1',
          trustScore: 1,
          energyLevel: [100,90,85,80,70,65,50,45,40,40,40,0]
        },
        {
          droneId: 'd2',
          trustScore: 0.8,
          energyLevel: [100,90,85,80,70,60,40,30,25,25,25,0]
        }
      ],
      source: 's3',
      destination: 'd3',
      status: 'aborted'
    };

    this.missions.push(mission);

    mission = {
      missionId: 'm4',
      missionName: 'Aerial Survey',
      droneIds: [
        {
          droneId: 'd1',
          trustScore: 1,
          energyLevel: [100,90,85,80,70,65,50,45,40,40,40,0]
        },
        {
          droneId: 'd2',
          trustScore: 0.8,
          energyLevel: [100,90,85,80,70,60,40,30,25,25,25,0]
        },
        {
          droneId: 'd3',
          trustScore: 0.2,
          energyLevel: [100,90,85,80,25]
        }
      ],
      source: 's4',
      destination: 'd4',
      status: 'inactive'
    };

    this.missions.push(mission);    
  }

  getChart(row: any) {
    this.displayChart = true;
    this.energyLevelDroneId = row.droneId;
    let energy = this.missions.find(m => m.missionId == 'm4')?.droneIds.find(d => d.droneId == row.droneId).energyLevel;
    
    console.log(energy);
    console.log(row);

    if(this.chart)
    {
      this.chart.destroy();
    }
    
    let chartRef = this.element.nativeElement.querySelector('#myChart');

    this.chart = new Chart(chartRef, {
      type: 'line',
      data: {
        labels: ['0', '15', '30', '45', '60', '75', '90', '105', '120', '135', '160'],
        datasets: [{
            label: '',
            data: energy,
            borderWidth: 3,
            borderColor: 'red'
        }]
    },
      options: {
        maintainAspectRatio: false,
       scales:{
         x: {
           title: {
             align: "center",
             color: "blue",
             text: "Time (in Minutes)",
             display: true,
             font: {
               size: 18
             }
           }
         },
         y: {
          title: {
            align: "center",
            color: "orange",
            text: "Energy Level (in %)",
            display: true,
            font: {
              size: 18
            }
          }
        }
       }
      }
    });
  }

}
