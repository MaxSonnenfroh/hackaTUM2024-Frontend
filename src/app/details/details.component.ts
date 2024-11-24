import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateMessage } from '../types/UpdateMessage';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class ManageComponent implements OnInit, OnChanges {
  top3Vehicles: {id: string, percentage: number}[] = [];
  bottom3Vehicles: {id: string, percentage: number}[] = [];
  customerOnTransitHistory: number[] = [];

  @Input() message!: UpdateMessage | undefined;

  totalTime: string = "";
  averageWait: number = 0;
  averageUtilization: number = 0;
  loadBigger75: {id: string, percentage: number}[] = [];
  loadSmaler25: {id: string, percentage: number}[] = [];
  extremeWaitTime: {id: string, time: string}[] = [];
  waitingCustomers: string[] = [];
  customersOnTransit: string[] = [];
  dropedCustomers: string[] = [];
  currentDistance: {[key: string]: number} = {};

  highestDistance: number = 5;
  shortestDistance: number = 1;
  currentDistanceXX: number = 0;
  averageTripDistance: any = 0;
  averageSpeed: any = 0;

  constructor(private sharedService: SharedService) {
    this.sharedService.currentMessage.subscribe(message => {
      if (message) {
        this.message = message;
        this.loadBigger75 = message.loadBigger75;
        this.loadSmaler25 = message.loadSmaler25;
        // ...update other properties as needed...
      }
    });
  }

  private updatetopVehicle() {
    this.top3Vehicles = this.loadBigger75.sort((a, b) => b.percentage - a.percentage);
    this.top3Vehicles = this.top3Vehicles.slice(0, 3);
    this.bottom3Vehicles = this.loadSmaler25.sort((a, b) => a.percentage - b.percentage);
    this.bottom3Vehicles = this.bottom3Vehicles.slice(0, 3);
  }



  ngOnInit(): void {
    this.updatetopVehicle();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
      if (this.message === undefined) {
        return;
      }
      this.loadBigger75 = this.message.loadBigger75;
      this.loadSmaler25 = this.message.loadSmaler25;
      this.updatetopVehicle();
  }
}
