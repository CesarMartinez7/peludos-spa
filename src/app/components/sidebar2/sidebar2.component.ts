import { Component, Output, EventEmitter } from '@angular/core';
import { RoutesType } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar2',
  imports: [RouterModule],
  templateUrl: './sidebar2.component.html',
  styleUrl: './sidebar2.component.css',
})
export class Sidebar2Component {


  routes: RoutesType[] = [
    { name: '¿Por qué?', id: 'porque' },
    { name: 'Nuestros planes', id: 'planes' },
    { name: 'Club', id: 'club' },
    { name: '¿Quieres más info?', url:`/document/Clausulado.pdf` },
    { name: 'Blog', id: 'blog' },
    { name: 'Asistencias', id: 'asistencias' },
  ];



  openNav() {
    document.getElementById('mySidebar')!.classList.remove('hidden');
    document.getElementById('main')!.classList.add('ml-[250px]');
  }
  
  closeNav() {
    document.getElementById('mySidebar')!.classList.add('hidden');
    document.getElementById('main')!.classList.remove('ml-[250px]');
  }
  
}
