export interface UpdateMessage {
  totalTime: string
  averageWait: number
  averageUtilization: number
  loadBigger75: LoadBigger75[]
  loadSmaler25: LoadSmaler25[]
  extremeWaitTime: ExtremeWaitTime[]
  waitingCustomers: string[]
  customersOnTransit: string[]
  dropedCustomers: string[]
  currentDistance: CurrentDistance
}

export interface LoadBigger75 {
  id: string
  percentage: number
}

export interface LoadSmaler25 {
  id: string
  percentage: number
}

export interface ExtremeWaitTime {
  id: string
  time: string
}

export interface CurrentDistance {
  id1: number
  id2: number
  id3: number
  id4: number
  id5: number
  id6: number
}
