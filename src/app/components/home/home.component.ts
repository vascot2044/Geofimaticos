import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  screen="";
  a:any;
  b:any;
  c:any;
  d="";
  e="";

  contendor:any;
  arrayOperaciones: any = [];
  arrayResultados: any = [];
  verOperaciones: any = [];
  mostrarStorage: any;
  buttonHistory: any;
  btnActive="text-right";
  calculadoraPos: any;
  historyPos:any;
  estiloPos1?: string;
  estiloPos2?: string;

  @ViewChild('mostrarOperaciones',{static: true}) mostrarOperaciones!: ElementRef

  constructor(private renderer:Renderer2){

  }

  ngOnInit(): void {

    //Posicion texto del history inicial
    this.buttonHistory = true;
    this.btnActive= 'text-right';

    //Posicion Inicial divs
    this.calculadoraPos=false;
    this.historyPos=true;
   
    //VERIFICACION DE LAS VARIABLES DEL LOCAL STORAGE
    
    this.verOperaciones = localStorage.getItem('operaciones') || [];

    //Se crea el elemento del history con las variables del storage
    this.crearHtmlStorage();

    // Fondo 
    
    
  }
  //Calculadora

  enterValue(value:string){
    if ((this.b=="+")||(this.b=="-")||(this.b=="*")||(this.b=="/")) {
      this.d= this.d + value;
      this.screen = this.screen + value;
      this.c= this.d;
      
    }else{
      this.screen = this.screen + value;
      this.a = this.screen;
      
    }

  }

  condition(value:string){
    this.screen= this.screen + value;
    this.b= value;
  }

  clear(){
    this.screen = "";
    this.a = "";
    this.b = "";
    this.c = "";
    this.d = "";
  }

  result(){
    if (this.b== '+') {
      this.screen = `${this.screen}= ${(parseInt(this.a)+ parseInt(this.c)).toString()}`;
      this.screen =(parseInt(this.screen)+ parseInt(this.c)).toString();

      //carga del historial
      const operacion = `${this.a}${this.b}${this.c}`;
      const resultado = this.screen;

      this.crearHtml(operacion, resultado);
  
    }
    if (this.b== '-') {
      this.screen = `${this.screen}= ${(parseInt(this.a)- parseInt(this.c)).toString()}`;
      this.screen =(parseInt(this.screen)- parseInt(this.c)).toString();

      //carga del historial
      const operacion = `${this.a}${this.b}${this.c}`;
      const resultado = this.screen;

      this.crearHtml(operacion, resultado);
  
    }
    if (this.b== '*') {
      this.screen = `${this.screen}= ${(parseInt(this.a)* parseInt(this.c)).toString()}`;
      this.screen =(parseInt(this.screen)* parseInt(this.c)).toString();

      //carga del historial
      const operacion = `${this.a}${this.b}${this.c}`;
      const resultado = this.screen;

      this.crearHtml(operacion, resultado);
  
    }
    if (this.b== '/') {
      this.screen = `${this.screen}= ${(parseInt(this.a)/ parseInt(this.c)).toString()}`;
      this.screen =(parseInt(this.screen)/ parseInt(this.c)).toString();

      //carga del historial
      const operacion = `${this.a}${this.b}${this.c}`;
      const resultado = this.screen;

      this.crearHtml(operacion, resultado);
  
    }
    this.clear();

 
  }

  // Se crea de forma dinamica el history mediante el DOM

  crearHtml(operacion:string, resultado:string){
    const mostrar={
      operacion,
      resultado
    }

    var containerCard= document.createElement('div');
    var verOperacion= document.createElement('p');
    var verResultado= document.createElement('p');

    containerCard.classList.add('containerCard');
    verOperacion.classList.add('operation');
    verResultado.classList.add('resultOperation');

    containerCard.appendChild(verOperacion);
    containerCard.appendChild(verResultado);

    this.renderer.appendChild(this.mostrarOperaciones.nativeElement, containerCard);

    this.contendor = containerCard;

    this.arrayOperaciones = [...this.arrayOperaciones, mostrar];

    this.arrayOperaciones.forEach((element:any)=>{
      this.contendor.querySelector('.operation').innerText = element.operacion;
      this.contendor.querySelector('.resultOperation').innerText = element.resultado;
    })

    this.sincronizarStorage();

    }

    sincronizarStorage(){
      localStorage.setItem('operaciones', JSON.stringify(this.arrayOperaciones));
    }


    crearHtmlStorage(){

      if (this.verOperaciones.length > 0) {

        var containerCard= document.createElement('div');
        var verOperacion= document.createElement('p');
        var verResultado= document.createElement('p');
    
        containerCard.classList.add('containerCard');
        verOperacion.classList.add('operation');
        verResultado.classList.add('resultOperation');
    
        containerCard.appendChild(verOperacion);
        containerCard.appendChild(verResultado);
    
        this.renderer.appendChild(this.mostrarOperaciones.nativeElement, containerCard);
    
        this.contendor = containerCard; 
        
        this.arrayResultados=JSON.parse(this.verOperaciones);
        this.arrayResultados.forEach((element:any)=>{
          this.crearHtml(element.operacion, element.resultado);
        })

      }

    }
// LOGICA DE EL BOTON LIMPIAR HISTORY
    limpiar(){
      if (this.arrayOperaciones.length > 0) {

        Swal.fire({
          
          icon:'question',
          title:'¿Desea limpiar el historial?',
          //showDenyButton:true,
          confirmButtonColor:"#3085d6",
          //cancelButtonColor:"#d33",
          confirmButtonText:'Aceptar',
          //cancelButtonText:'Cancelar',
          allowOutsideClick:false,

        }).then((result)=>{
          localStorage.removeItem('operaciones');
          Swal.fire({
            icon:'success',
            title:'El historial se limpio correctamente',
            confirmButtonText:'Aceptar',
            
          }).then((result)=>{
            if (result.value) {
             location.reload()
            }
            
          })
        })
        
      }else{

        Swal.fire({
          icon:'info',
          title:'El historial esta limpio',
        })

      } 
    }

    // cambiarPosicion(){
    //   if (this.buttonHistory){

    //     this.buttonHistory = false;
    //     this.btnActive ='text-left'

    //   } else{

    //     this.buttonHistory = true;
    //     this.btnActive = "text-right"

    //   }
    // }

    cambiarPosicionDiv(){
      
      if(this.calculadoraPos && !this.historyPos){

        this.calculadoraPos=false;
        this.historyPos=true;
        this.estiloPos1='';
        this.estiloPos2='';

      } else {
        this.calculadoraPos=true;
        this.historyPos=false;
        this.estiloPos1= ' transform: translate(100%)';
        this.estiloPos2= ' transform: translate(-100%)';
      }
    }

}
