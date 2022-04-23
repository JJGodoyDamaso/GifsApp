import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SerachGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private _historial  : string[] = [];
    private servicioURL : string = "https://api.giphy.com/v1/gifs";
    private apiKey      : string = "nXYFEVd20rlfxh3lIT0S5f4h7hYqeMtk";
    public resultados   : Gif[] = [];

    get historial(): string[] {
      return [...this._historial];
    }

    constructor (private http: HttpClient) {
        this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
        this.resultados = JSON.parse( localStorage.getItem('ultimaBusqueda')!) || {};
    }

    buscarGifs (query:string): void  {
      query = query.trim().toLowerCase();
      if(query.trim().length === 0) {
        return;
      }
      if(!this._historial.includes(query)){
        this._historial.unshift(query);
        this._historial = this._historial.splice(0, 10);

        localStorage.setItem('historial', JSON.stringify(this._historial));

      }

      const params = new HttpParams()
          .set("api_key", this.apiKey)
          .set("limit", "10")
          .set("q", query);

      this.http.get<SerachGifsResponse>(`${this.servicioURL}/search`, {params}).subscribe(
        (resp) => {
          this.resultados = resp.data;
          localStorage.setItem('ultimaBusqueda', JSON.stringify(resp.data));
        }
      );
    }
}
