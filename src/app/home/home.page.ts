import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content?: IonContent;

  pokemons: { name: string; image: string; isFavorite: boolean }[] = [];
  filteredPokemons: { name: string; image: string; isFavorite: boolean }[] = [];
  currentPage: number = 1;
  pageSize: number = 20;
  searchTerm: string = '';
  searchInput: Subject<string> = new Subject<string>();
  reachedEnd: boolean = false;

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
    this.searchInput.pipe(debounceTime(2000)).subscribe(() => {
      this.searchPokemon();
    });
  }

  async loadPokemons() {
    this.pokemonService.getPokemonList(this.pageSize, (this.currentPage - 1) * this.pageSize).subscribe((response: any) => {
      this.pokemons = response.results.map((pokemon: any) => ({
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`,
        isFavorite: false
      }));
      this.filteredPokemons = [...this.pokemons];
    });
  }

  toggleFavorite(pokemon: any) {
    pokemon.isFavorite = !pokemon.isFavorite;
  }

  openDetailsPage(pokemonName: string) {
    this.router.navigate(['/details', pokemonName]);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }

  nextPage() {
    this.currentPage++;
    this.loadPokemons();
  }

  searchPokemon() {
    if (this.searchTerm.trim() === '') {
      this.filteredPokemons = [...this.pokemons];
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearchInput(event: any) {
    this.searchTerm = event.target.value;
    this.searchInput.next(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredPokemons = [...this.pokemons];
  }

  handleScroll(event: any) {
    if (this.content) {
      this.content.getScrollElement().then(scrollElement => {
        if (scrollElement.scrollHeight - scrollElement.clientHeight <= scrollElement.scrollTop) {
          this.reachedEnd = true;
        } else {
          this.reachedEnd = false;
        }
      });
    }
  }
}
