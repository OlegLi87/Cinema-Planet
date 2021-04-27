export interface MovieSession {
  id: number;
  auditoriumId: number;
  auditoriumName: string;
  movieId: number;
  movieName: string;
  sessionDate: Date;
  ordersAmount: number;
}
