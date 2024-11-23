import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../services/websocket.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  messages: string[] = [];

  constructor(private wsService: WebSocketService) {
    this.wsService.getMessages().subscribe((message: string) => {
      console.log('Message received:');
      this.messages.push(message);
      console.log(this.messages);
    });
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
