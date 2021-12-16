import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { drone } from 'src/app/interfaces/drone';
import { mission } from 'src/app/interfaces/mission';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  panelOpenState = false;
  showAddDrone = false;

  missions: mission[] = [];
  dronesControl = new FormControl();
  drones: drone[] = [];
  // droneDetails: drone = {droneId: '', model: '', memory: '', camera:'', processor: '',year: '', manufacturer: ''};
  droneDetails!: drone[];
  showDroneDetails: boolean = false;
  constructor(private formBuilder: FormBuilder) { }


  droneMissionForm!: FormGroup;

  ngOnInit(): void {
    let mission: mission = {
      missionId: 'm1',
      missionName: 'Disaster Management',
      droneIds: ['d1','d3'],
      source: 's1',
      destination: 'd1',
      status: ''
    };

    this.missions.push(mission);

    mission = {
      missionId: 'm2',
      missionName: 'Footage',
      droneIds: ['d2','d3'],
      source: 's2',
      destination: 'd2',
      status: ''
    };

    this.missions.push(mission);

    mission = {
      missionId: 'm3',
      missionName: 'Traffic Management',
      droneIds: ['d1','d2'],
      source: 's3',
      destination: 'd3',
      status: ''
    };

    this.missions.push(mission);

    mission = {
      missionId: 'm4',
      missionName: 'Aerial Survey',
      droneIds: ['d1','d2', 'd3'],
      source: 's4',
      destination: 'd4',
      status: ''
    };

    this.missions.push(mission);


    let drone: drone = {
      droneId: 'd1',
      model: 'Air 2',
      manufacturer: 'DJI Mavis Air',
      year:'2020',
      processor: 'Ocusync 2.0',
      camera: '48MP',
      memory: '32GB',
      trustScore: 1
    }

    this.drones.push(drone);

    drone = {
      droneId: 'd2',
      model: 'M2',
      manufacturer: 'MJX',
      year:'2019',
      processor: 'Ocusync 1.0',
      camera: '48MP',
      memory: '32GB',
      trustScore: 0.8
    }

    this.drones.push(drone);

    drone = {
      droneId: 'd3',
      model: 'HS2',
      manufacturer: 'Holy Stone',
      year:'2021',
      processor: 'Ocu 2.0',
      camera: '48MP',
      memory: '32GB',
      trustScore: 0.2
    }

    this.drones.push(drone);

    this.initializeForm();
    
  }

  initializeForm() {
    this.droneMissionForm = this.formBuilder.group({
      droneId: ['', Validators.required],
      missionId: ['', Validators.required]
    });
  }

  resetForm() {
    this.initializeForm();
    this.showDroneDetails = false;
  }

  showAddDroneDiv(){
    this.showAddDrone = true;
  }

  getDroneDetails(droneId: string){
    console.log(this.dronesControl.value);
    console.log(droneId);
   this.droneDetails = this.drones.filter(d => this.dronesControl.value.includes(d.model)) ?? [{droneId: '', model: '', memory: '', camera:'', processor: '',year: '', manufacturer: '', trustScore: 0}]; 
   this.showDroneDetails = true;
   console.log(this.droneDetails);
   console.log(this.drones);
  }

//   randomString(length: number, chars: string) : string {
//     var result = '';
//     for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//     return result;
// }

}
