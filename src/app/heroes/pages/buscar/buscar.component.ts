import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
  .full-width {
  width: 100%;
  }
  `
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];

  hereoSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim()).subscribe(heroes => this.heroes = heroes);
  }

  opcionSeleccionada(even: MatAutocompleteSelectedEvent) {

    if (!even.option.value) {
      this.hereoSeleccionado = undefined;
      return;
    }


    const heroe: Heroe = even.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroePorId(heroe.id!)
      .subscribe(heroe => this.hereoSeleccionado = heroe);
  }
}
