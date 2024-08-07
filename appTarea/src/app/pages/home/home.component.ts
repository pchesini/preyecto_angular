import { Component, booleanAttribute, computed, numberAttribute, signal } from '@angular/core';
import { Tarea } from '../interfaces/tarea';
import { FormControl, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent {
  formHome = new FormControl('',{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
     // this.noLeadingSpacesValidator() corregir esto
    ]
  }); 
 // submitted = false;
/*   ngOnInit() {
    this.formHome.valueChanges.subscribe(() => {
      this.removeLeadingSpaces();
    });
  } */

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

  filter = signal< 'todas' | 'pendiente' | 'completado'>('todas');
  tareasByfilter = computed(() => {
    const filter = this.filter();
    const tareas = this.tareas();
    if (filter === 'pendiente'){
      return tareas.filter( tarea => !tarea.completado)
    }
    if (filter ==='completado') {
      return tareas.filter(tareas => tareas.completado)
    }
    return tareas;
  })
  //agregar un nuevo elemento( ) 
  changeHandler(){
    if (this.formHome.valid){
      const valor = this.formHome.value.trim();
      this.addTarea(valor);
      this.formHome.setValue('');
    }
    

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
  // Validador personalizado para no permitir espacios al principio
/* noLeadingSpacesValidator() {
  return (control: FormControl) => {
    const isValid = control.value && control.value.trim().length === control.value.length;
    return isValid ? null : { leadingSpaces: true };
  };
}
removeLeadingSpaces() {
  const currentValue = this.formHome.value;
  if (currentValue) {
    const trimmedValue = currentValue.replace(/^\s+/, '');
    this.formHome.setValue(trimmedValue, { emitEvent: false });
  }
}
 */
updateEdicion(index: number){
  this.tareas.update(prevState =>{
    return prevState.map((tarea, position)=> {
      if (position === index) {
        return {
          ...tarea,
          editando: true
        }
      }
      return {
        ...tarea,
        editando: false
      };
    })
  })
}
updateEdicionTitulo(index: number, event: Event){
  const input = event.target as HTMLInputElement;
  this.tareas.update(prevState =>{
    return prevState.map((tarea, position)=> {
      if (position === index) {
        return {
          ...tarea,
          titulo: input.value,
          editando : false
        }
      }
      return tarea;
    })
  })
}
changeFilter(filter: 'todas' | 'pendiente' | 'completado'){
  this.filter.set(filter);
}
}
