import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { Game } from './game.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) { }

  get games() {
    return this._games.asObservable();
  }

  addGame(title: string, developer: string, publisher: string, genre: string, platform: string, status: string, imageUrl: string) {
    
    let generatedId;
    let newGame: Game;
    let fetchedUserId: string;

    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        console.log('IZ games' + userId);
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        newGame = new Game(null, title, developer, genre, publisher, platform, status, imageUrl, fetchedUserId);
        return this.http.post<{ name: string }>(`https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app/games.json?auth=${token}`, newGame)
      }),
      take(1),
      switchMap((resData) => {
        generatedId = resData.name;
        return this.games;
      }), 
      take(1), 
      tap((games => {
        newGame.id = generatedId;
        this._games.next(games.concat(newGame))
      })))
  }

  getGames(userId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: GameData }>(`https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app/games.json?auth=${token}`);
      }),
      map((gamesData) => {
      const games: Game[] = [];
        for (const key in gamesData) {
          if (gamesData.hasOwnProperty(key) && gamesData[key].userId === userId) {
            games.push(new Game(key, gamesData[key].title, gamesData[key].developer, gamesData[key].genre, gamesData[key].publisher, gamesData[key].platform, gamesData[key].status, gamesData[key].imageUrl, gamesData[key].userId));
          }
        }
        this._games.next(games);
        return games;
      }),
      tap(games => {
      this._games.next(games);
      })
    );
  }

  getGame(id: string) {
    return this.http.get<{ key: string }>(`https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app/games/${id}.json`);
  }
}
