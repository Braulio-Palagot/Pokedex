import { Component, OnInit } from '@angular/core';
import {PokeapiService} from '../services/pokeapi.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  pokemon: any;
  public stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };

  constructor(
    private pokeapi: PokeapiService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemon = await this.pokeapi.findPokemon(id);
    this.loadStats();
  }

  private loadStats() {
    this.stats = {
      hp: this.pokemon.stats[0].base_stat,
      attack: this.pokemon.stats[1].base_stat,
      defense: this.pokemon.stats[2].base_stat,
      speed: this.pokemon.stats[5].base_stat
    };
  }
}
