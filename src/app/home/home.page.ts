import {Component, OnInit, ViewChild} from '@angular/core';
import {PokeapiService} from '../services/pokeapi.service';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public pokemonList: any[];
  private offset: number;

  constructor(private pokeapi: PokeapiService) {}

  ngOnInit() {
    this.pokemonList = [];
    this.offset = 0;
    this.loadPokemons();
  }

  async loadPokemons(showMore = false, event?: any) {
    if (showMore) {
      this.offset += 25;
    }

    const data = await this.pokeapi.getPokemonList(this.offset);
    this.pokemonList = [...this.pokemonList, ...data];

    if (event) {
      event.target.complete();
    }
  }

  onChangeSearch = async (event) => {
    const searchValue = event.detail.value.replace(/\s/g, '');

    if (!searchValue) {
      this.pokemonList = [];
      this.offset = 0;
      this.loadPokemons();
      return;
    }

    await this.pokeapi.findPokemon(searchValue)
      .then(data => this.pokemonList = [data])
      .catch(() => this.pokemonList = []);
  };
}
