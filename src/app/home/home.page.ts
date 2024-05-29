import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: { name: string; image: string }[] = [];

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  async loadPokemons() {
    this.pokemonService.getPokemonList(100, 0).subscribe((response: any) => {
      this.pokemons = response.results.map((pokemon: any) => ({
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`
      }));
    });
  }

  openDetailsPage(pokemonName: string) {
    this.router.navigate(['/details', pokemonName]);
  }
}