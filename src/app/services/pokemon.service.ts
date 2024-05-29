import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`);
  }

  getPokemonList(limit: number, offset: number): Observable<{ results: Pokemon[] }> {
    return this.http.get<{ results: Pokemon[] }>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }
}