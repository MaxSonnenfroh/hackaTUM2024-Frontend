import { Component, OnInit } from '@angular/core';
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

  constructor(private wsService: WebSocketService) {
    this.wsService.getMessages().subscribe((message: Message) => {
      this.messages.push(message);
      this.parseMessage(message);
    });
  }

  private parseMessage(message: Message) {
    if (message.key === 'init') {
      this.vehicles = (message.value as InitMessage).vehicles;
      this.customers = (message.value as InitMessage).customer;
    } else {
      let updateMessage = message.value as UpdateMessage;
      this.updateCard('Active Vehicles', this.vehicles.length - updateMessage.dropedCustomers.length);
      this.updateCard('Total Number of Trips', updateMessage.dropedCustomers.length);
      this.updateCard('Average Wait Time', "< " + updateMessage.averageWait + " mins");
      this.updateCard('Average Load per Vehicle', updateMessage.averageUtilization*100 + "%");
    }
  }

  private updateCard(type: string, value: any) {
    let card = this.cards.find(card => card.title === type);
    if (card) {
      card.value = value;
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
    value: "86%"
  }
]

}
