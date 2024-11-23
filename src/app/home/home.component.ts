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
  imports: [CardComponent, CommonModule, MapComponent, ChartViewComponent],
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
    title: 'Total Time',
    value: 1
  }, {
    title: 'Average Wait Time',
    value: 2
  },
  {
    title: 'Average Load',
    value: 3
  },
  {
    title: 'Vehicles with load > 75%',
    value: 4
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
