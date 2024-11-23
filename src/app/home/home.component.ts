import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../services/websocket.service';
import { MapComponent } from '../map/map.component';
import { ChartViewComponent } from '../chart/chart.component';

type Message = {
  type: string;
  value: any;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, MapComponent, ChartViewComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  messages: Message[] = [];

  constructor(private wsService: WebSocketService) {
    this.wsService.getMessages().subscribe((message: Message) => {
      this.messages.push(message);
      this.parseMessage(message);
    });
  }

  private parseMessage(message: Message) {
    switch (message.type) {
      case 'vehicle':
        // Add vehicle marker
        break;
      case 'customer':
        // Add customer marker
        break;
      case 'depot':
        // Add depot marker
        break;
      case 'route':
        // Draw route
        break;
      case 'totalTime':
        this.updateCard('Total Time', message.value);
        break;
      default:
        console.error('Unknown message type:', message.type);
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
    value: 34
  },
  {
    title: 'Total Number of Trips',
    value: 72
  },
  {    title: 'Average Wait Time',
    value: "< 5 mins"
  },
  {
    title: 'Average Load',
    value: "86%"
  },
  {
    title: 'Vehicles with load < 25%',
    value: 5
  },
  {
    title: 'Customers with wait time > 10 mins',
    value: 6
  }
]

}
