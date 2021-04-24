export interface Movie {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  genre: string;
  releaseDate: Date;
  basicSeatPrice: number;
  silverSeatPrice: number;
  goldSeatPrice: number;
  activeSessions: number;
}
