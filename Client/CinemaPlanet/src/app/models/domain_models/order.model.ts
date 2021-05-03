export interface Order {
  id?: number;
  movieSessionId: number;
  seatType: string;
  seatNumber?: number;
  movieName?: string;
  auditoriumName?: string;
  sessionDate?: Date;
}
