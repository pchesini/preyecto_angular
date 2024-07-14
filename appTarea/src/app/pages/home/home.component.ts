import { Component, booleanAttribute, numberAttribute, signal } from '@angular/core';
import { Tarea } from '../interfaces/tarea';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tareas =  signal<Tarea[]>([
   {
    id : Date.now(),
    titulo : 'crear Proyecto',
    completado: false,
   },
   {
    id : Date.now(),
    titulo : 'crear Componente',
    completado: false,
   }
  ]);
  //agregar un nuevo elemento
  changeHandler(event : Event ){
    const input = event.target as HTMLInputElement;
    const nuevaTarea = input.value;
    this.addTarea(nuevaTarea);
    // agrego al array una nueva tarea trayendome antes las tareas previas
    //this.tareas.update((tareas) => [...tareas, nuevaTarea]);
  }
  addTarea(titulo: string) {
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      completado: false,
    };
    // usa el estado anterior del array[...tareas] y le agrega una nueva tarea
    this.tareas.update((tareas) => [...tareas, nuevaTarea]);

  }
  //recibo la posicion
  deleteTarea(index : number){
    //recibo el array , filtro la posicion y pregunto si es distinta a la que recibo por parametro
    this.tareas.update((tareas)=> tareas.filter((tarea, position)=> position !== index));
  }
  updateTarea(index: number){
    this.tareas.update((tareas) =>{
      //recibe el objeto y la posicion del mismo
      return tareas.map((tarea, position) => {
        if (position === index) {
          return {
            //cambia el estado anterior de la tarea
            ...tarea,
            completado: !tarea.completado
          }
        }
        return tarea;
      })
    })
  }
}
