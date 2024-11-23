import { Component, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../services/websocket.service';
import { MapComponent } from '../map/map.component';
import { ChartViewComponent } from '../chart/chart.component';
import { Message } from '../types/Message';
import { Vehicle } from '../types/Vehicle';
import { Customer } from '../types/Customer';
import { InitMessage } from '../types/InitMessage';
import { UpdateMessage } from '../types/UpdateMessage';
import { Xliff } from '@angular/compiler';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, MapComponent, ChartViewComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  messages: Message[] = [];
  totalVehicles: number = 0;
  totalCustomers: number = 0;

  vehicles: Vehicle[] = [];
  customers: Customer[] = [];

  @ViewChild(ChartViewComponent) chartComponent?: ChartViewComponent;
  @ViewChild(MapComponent) mapComponent?: MapComponent;

  generalOverviewItems: any[] = [0, 0, 0, 0];

  constructor(private wsService: WebSocketService) {
    this.wsService.getMessages().subscribe((message: Message) => {
      this.messages.push(message);
      this.parseMessage(message);
    });
  }

  private parseMessage(message: Message) {
    if (message.key === 'init') {
      console.log('init message', message);
      let initMessage = message.value as InitMessage;
      this.vehicles = initMessage.vehicles;
      this.customers = initMessage.customer;

      // NEU: General Overview initialisieren
      this.generalOverviewItems[0] = this.customers.length; // Anzahl Kunden
      this.generalOverviewItems[1] = this.vehicles.length; // Anzahl Fahrzeuge

      //initialize the cards
      let initData = [initMessage.customer.length, 0, 0];
      this.updateChart(initData);
      //initialize the map
      this.vehicles.forEach((vehicle, idx) => {
        if (this.mapComponent) {
          this.mapComponent.initMapMarkers(vehicle.id, vehicle.startCoordinate.latitude, vehicle.startCoordinate.longitude, 'vehicle');
        }
      });
      this.customers.forEach((customer, idx) => {
        if (this.mapComponent) {
          this.mapComponent.initMapMarkers(customer.id, customer.startCoordinate.latitude, customer.startCoordinate.longitude, 'customer');
          this.mapComponent.initMapMarkers(customer.id, customer.destinationCoordinate.latitude, customer.destinationCoordinate.longitude, 'depot');
          this.mapComponent.initMapLine(customer.id, customer.startCoordinate.latitude, customer.startCoordinate.longitude, customer.destinationCoordinate.latitude, customer.destinationCoordinate.longitude);
        }
      });
    } else {
      console.log('update message', message);
      let updateMessage = message.value as UpdateMessage;
      this.updateCard('Active Vehicles', this.vehicles.length - updateMessage.dropedCustomers.length);
      this.updateCard('Total Number of Trips', updateMessage.dropedCustomers.length);
      this.updateCard('Average Wait Time', "< " + updateMessage.averageWait + " mins");
      this.updateCard('Average Load per Vehicle', updateMessage.averageUtilization*100 + "%");
      let newData = [updateMessage.waitingCustomers.length, updateMessage.customersOnTransit.length, updateMessage.dropedCustomers.length];
      this.updateChart(newData);
    }
  }

  private updateCard(type: string, value: any) {
    let card = this.cards.find(card => card.title === type);
    if (card) {
      card.value = value;
    }
  }

  private updateChart(newData: number[]) {
    if (this.chartComponent) {
      this.chartComponent.data = newData;
    }
  }

  cards: CardComponent[] = [{
    title: 'Active Vehicles',
    value: 0
  },
  {
    title: 'Total Number of Trips',
    value: 0
  },
  {    title: 'Average Wait Time',
    value: "< 5 mins"
  },
  {
    title: 'Average Load per Vehicle',
    value: "0%"
  }
]

}
