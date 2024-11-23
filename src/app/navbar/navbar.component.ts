import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  homeActive: boolean = true;
  aboutActive: boolean = false;

  onNavClick(page: string) {
    this.homeActive = page === 'home';
    this.aboutActive = page === 'manage';
  }
}
