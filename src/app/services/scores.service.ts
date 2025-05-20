import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  GameScoreInfo,
  ScoreSaveResponse,
  ScoresResponse,
} from 'src/app/interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoresService {
  private readonly baseUrl = environment.API_URL;
  private readonly http = inject(HttpClient);

  save(gameScoreInfo: GameScoreInfo) {
    return firstValueFrom(
      this.http.post<ScoreSaveResponse>(
        `${this.baseUrl}scores/save`,
        gameScoreInfo
      )
    );
  }

  scores(userId: string) {
    return firstValueFrom(
      this.http.get<ScoresResponse>(`${this.baseUrl}scores/${userId}`)
    );
  }

  bestScores() {
    return firstValueFrom(
      this.http.get<ScoresResponse>(`${this.baseUrl}scores/leaderboard/`)
    );
  }
}
