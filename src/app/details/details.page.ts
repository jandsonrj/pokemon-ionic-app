import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemon: any;
  pokemons: any[] = [];

  slideOpts = {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name') ?? '';
    if (name) {
      this.pokemonService.getPokemon(name).subscribe(response => {
        this.pokemon = response;
      });
    } else {
      console.error('No Pokémon name provided');
    }
  }

  closeDetails() {
    this.router.navigate(['/']);
  }
}