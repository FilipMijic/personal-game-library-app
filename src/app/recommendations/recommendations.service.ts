import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, switchMap, map, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recommendation } from './recommendation.model';

interface RecommendationData {
  rating: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  private _recommendations = new BehaviorSubject<Recommendation[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get recommendations() {
    return this._recommendations.asObservable();
  }

  addRecommendation(rating: number, text: string): Observable<Recommendation> {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        const newRecommendation: Recommendation = new Recommendation(null, rating, text);
        return this.http.post<{ name: string }>(`https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app/recommendations.json?auth=${token}`, newRecommendation);
      }),
      map(resData => {
        const id = resData.name;
        console.log(resData);
        return { id, rating, text } as Recommendation;
      })
    );
  }

  getRecommendation(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<RecommendationData>(
          `https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app/recommendations/${id}.json?auth=${token}`
        );
      }),
      map((resData) => {
        return new Recommendation(
          id,
          resData.rating,
          resData.text
        );
      })
    );
  }

  editRecommendation(recommendationId: string, rating: string, text: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.put(
          `https://personal-game-library-app-default-rtdb.europe-west1.firebasedatabase.app/recommendations/${recommendationId}.json?auth=${token}`,
          { rating, text }
        );
      }),
      switchMap(() => this.recommendations),
      take(1),
      tap((recommendations) => {
        const updatedRecommendationIndex = recommendations.findIndex((recommendation) => recommendation.id === recommendationId);
        const updatedRecommendations = [...recommendations];
        updatedRecommendations[updatedRecommendationIndex] = new Recommendation(
          recommendationId,
          +rating,
          text
        );
        this._recommendations.next(updatedRecommendations);
      })
    );
  }
}
