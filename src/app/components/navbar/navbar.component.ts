import { Component, ElementRef, viewChild, Input, input, inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface RoutesType {
  name: string;
  id?: string;
  url?: string
}

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',

})
export class NavbarComponent {
  routes: RoutesType[] = [
    { name: '¿Por qué?', id: 'porque' },
    { name: 'Nuestros planes', id: 'planes' },
    { name: 'Club', id: 'club' },
    { name: '¿Quieres más info?', url:`/document/Clausulado.pdf` },
    { name: 'Blog', id: 'blog' },
    { name: 'Asistencias', id: 'asistencias' },
  ];

  @Input() typeActivate! : string
  @Input() openSideBar!: () => void  

 
  scrollTo(id: string = 'porque') {
    const el = document.getElementById(id);
    if (el) {
   
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openSidebarFunction(){
    if(this.openSideBar) {
      this.openSideBar()
      this.openSideBar
    }
  }

}
