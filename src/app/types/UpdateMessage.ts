export interface UpdateMessage {
  totalTime: string
  averageWait: number
  waitingTimes: WaitTime
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
  [key: string]: number
}

export interface WaitTime {
  [key: string]: number
}
