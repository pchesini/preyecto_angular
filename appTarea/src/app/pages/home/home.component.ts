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
  changeHandrer(event : Event ){
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
    this.tareas.update((tareas) => [...tareas, nuevaTarea]);

  }
  deleteTarea(index : number){
    this.tareas.update((tareas)=> tareas.filter((tarea, position)=> position !== index));
  }
}
