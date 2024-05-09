import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App de Tarea';
  tareas = [
    'instalar angular cli',
    'Crear Proyecto',
    'Crear Componente'
  ]
}
