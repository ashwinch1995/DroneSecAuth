import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-drone',
  templateUrl: './new-drone.component.html',
  styleUrls: ['./new-drone.component.scss']
})
export class NewDroneComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  newDroneForm = this.formBuilder.group({
    model: ['', Validators.required],
    year: ['', Validators.required],
    manufacturer: ['', Validators.required],
    camera: ['', Validators.required],
    processor: ['', Validators.required],
    memory: ['', Validators.required],
    other: ['', Validators.required],
    deviceId:['', Validators.required]
  });

  ngOnInit(): void {
  }

  submit() {
    let mod = this.newDroneForm.value.model;
  }
}
