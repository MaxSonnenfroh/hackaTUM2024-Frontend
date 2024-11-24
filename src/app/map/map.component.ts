import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

interface MarkerDictionary {
  id: string;
  idx: number;
}

interface LineDictionary {
  id: string;
  line: L.Polyline;
}


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true
})
export class MapComponent implements AfterViewInit {
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
    iconUrl: '../../assets/destinationmarker.png',
    iconSize: [25, 41],
    iconAnchor: [12, 20],
    popupAnchor: [0, -20]
  });

  // Save markers for later reference
  private vehicleMarkers:  MarkerDictionary[] = [];
  private depotMarkers: MarkerDictionary[] = [];
  private customerMarkers: MarkerDictionary[] = [];
  private lineMarkers: LineDictionary[] = [];

  // Add custom markers
  private addCustomMarkers(lat: number, lon: number, type: L.Icon<L.IconOptions>, spec: string, id: string) {
    // Example marker with custom icon
    const customMarker = L.marker([lat, lon], { icon: type }).addTo(this.map);
    customMarker.bindPopup(`${spec}: ${id}`);
    return this.markers.push(customMarker);
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
    return dashedLine.addTo(this.map);
  }

  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([48.138077, 11.577993]) // Munich, Germany
  ];

  constructor() { }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map').setView([48.138077, 11.577993], 12);
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
  }

  public initMapMarkers(id: string, lon: number, lat: number, type: string) {
    let markerIdx: number;
    switch(type) {
      case 'vehicle':
        markerIdx = this.addCustomMarkers(lon, lat, this.vehicleIcon, type, id);
        this.vehicleMarkers.push({id: id, idx: markerIdx});
        break;

      case 'depot':
        markerIdx = this.addCustomMarkers(lon, lat, this.depotIcon, type, id);
        this.depotMarkers.push({id: id, idx: markerIdx});
        break;

      case 'customer':
        markerIdx = this.addCustomMarkers(lon, lat, this.customerIcon, type, id);
        this.customerMarkers.push({id: id, idx: markerIdx});
        break;
    }
  }

  public initMapLine(id: string, startLat: number, startLon: number, endLat: number, endLon: number) {
    const points: L.LatLngExpression[] = [
      [startLat, startLon],
      [endLat, endLon]
    ];
    let line = this.drawDashedLine(points);
    this.lineMarkers.push({id: id, line: line});
  }
}
