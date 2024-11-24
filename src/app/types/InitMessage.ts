export interface InitMessage {
  vehicles: Vehicle[]
  customers: Customer[]
}

export interface Vehicle {
  id: string
  startCoordinate: Coordinate
}

export interface Coordinate {
  latitude: number
  longitude: number
}

export interface Customer {
  id: string
  startCoordinate: Coordinate
  destinationCoordinate: Coordinate
}
