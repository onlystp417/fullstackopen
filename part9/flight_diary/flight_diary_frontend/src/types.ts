export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
export interface DiaryInterface {
  id: string
  date: string
  weather: Weather
  visibility: Visibility
  comment?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NewDiary extends Omit<DiaryInterface, 'id'> {}