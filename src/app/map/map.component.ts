import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true
})
export class MapComponent implements OnInit, AfterViewInit {
  // Icons
  private customerIcon = L.icon({
    iconUrl: '../../assets/customermarker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 20],
    popupAnchor: [0, -20]
  });

  private vehicleIcon = L.icon({
    iconUrl: '../../assets/vehiclemarker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 20],
    popupAnchor: [0, -20]
  });

  private depotIcon = L.icon({
    iconUrl: '../../assets/depotmarker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 20],
    popupAnchor: [0, -20]
  });


  private addCustomMarkers(lat: number, lon: number, type: L.Icon<L.IconOptions> ) {
    // Example marker with custom icon
    const customMarker = L.marker([lat, lon], { icon: type }).addTo(this.map);

    this.markers.push(customMarker); // Store in the markers array if needed
  }

  // Dashed Line
  private drawDashedLine(points: L.LatLngExpression[]) {
    // Create a polyline with a dashed line style
    const dashedLine = L.polyline(points, {
      color: 'blue',        // Line color
      weight: 3,            // Line thickness
      dashArray: '10, 10',  // Pattern of dashes and gaps (10px dash, 10px gap)
      opacity: 0.8          // Line opacity
    });

    // Add the dashed line to the map
    dashedLine.addTo(this.map);
  }

  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([48.138077, 11.577993]) // Munich, Germany
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
    this.addCustomMarkers(48.138077, 11.577993, this.vehicleIcon);

    const points: L.LatLngExpression[] = [
      [48.138077, 11.577993], // Munich
      [48.140, 11.57700]
    ];
    this.drawDashedLine(points);
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map').setView([48.138077, 11.577993], 15);
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private centerMap() {
    // Create a boundary based on the markers
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    // Fit the map into the boundary
    // this.map.fitBounds(bounds);
  }
}
