import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { YoutubeResponse } from 'src/app/pages/client/tutorial/interfaces/youtube.models';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyBjR0NnjDWmau15LBqZkLqZpnvOWw9m7L0';
  // private playlist = 'UUNFGpAo9V9xcEb6hEfOmeRw';
  private playlist = 'UUUULwWNl9Wmky4YQ4a4bejA';
  public nextPageToken = '';
  public valideVideos = true;
  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '2000')
      .set('playlistId', this.playlist)
      .set('key', this.apikey)
      .set('pageToken', this.nextPageToken);

    return this.http.get<YoutubeResponse>(url, { params }).pipe(
      map((resp) => {
        if (resp.nextPageToken === undefined) {
          this.valideVideos = false;
        }
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),

      map((items) => items.map((video) => video.snippet))
    );
  }
}
