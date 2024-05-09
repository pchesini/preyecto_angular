import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent {
  title = "App Tareas"
  tareas = [
    'instalar angular cli',
    'Crear Proyecto',
    'Crear Componente'
  ]
}
