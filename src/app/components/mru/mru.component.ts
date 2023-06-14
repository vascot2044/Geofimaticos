import { Component} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';


imports: [
  // Otros módulos importados
  MatFormFieldModule,
]

@Component({
  selector: 'app-mru',
  templateUrl: './mru.component.html',
  styleUrls: ['./mru.component.css']
})
export class MruComponent {

  valor1vp=0;
  valor2vp=0;
  valor1pf=0;
  valor2pf=0;
  valor3pf=0;
  valor1tv=0;
  valor2tv=0;
  resultadovp=0;
  resultadopf=0;
  resultadotv=0;

  veloPromed() {
    this.resultadovp = this.valor1vp / this.valor2vp;
  }

  posFinal(){
    this.resultadopf =(this.valor1pf + this.valor2pf)*this.valor3pf
  }

  tiempoViaj(){
    this.resultadotv = this.valor1pf / this.valor2pf
  }


}
