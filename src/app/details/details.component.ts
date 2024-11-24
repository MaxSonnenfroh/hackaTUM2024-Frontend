import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateMessage } from '../types/UpdateMessage';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class ManageComponent implements OnInit {
  top3Vehicles: {id: string, percentage: number}[] = [];

  message!: UpdateMessage;

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

  constructor() {
  }

  ngOnInit(): void {
    this.top3Vehicles = this.loadBigger75.sort((a, b) => b.percentage - a.percentage);
    this.top3Vehicles = this.top3Vehicles.slice(0, 3);
  }

}
