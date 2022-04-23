import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

    @ViewChild("txtBuscar") txtBuscar!: ElementRef<HTMLInputElement>;

    constructor(private gifsService: GifsService) {

    }

    buscar(): void {
      const value = this.txtBuscar.nativeElement.value;
      this.gifsService.buscarGifs(value);
      this.txtBuscar.nativeElement.value = "";
    }
}
