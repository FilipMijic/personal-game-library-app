import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from './game.model';
import { HttpClient } from '@angular/common/http';

interface GameData {
  title: string;
  developer: string;
  publisher: string;
  genre: string;
  platform: string;
  status: string;
  imageUrl: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private _games = new BehaviorSubject<Game[]>([]);

  constructor(private http: HttpClient) { }

  get games() {
    return this._games.asObservable();
  }

  addGame(title: string, developer: string, publisher: string, genre: string, platform: string, status: string, imageUrl: string) {
    let newGame: Game;

    newGame = new Game(null, title, developer, genre, publisher, platform, status, imageUrl);
    return this.http.post<{ name: string }>(`https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app/games.json`, newGame);
  }

  getGames(id: string) {
    return this.http.get<{ [key: string]: GameData }>(`https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app/books.json`);
  }

  getGame(id: string) {
    return this.http.get<{ key: string }>(`https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app/games/${id}.json`);
  }
}
