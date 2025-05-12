import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { ContactComponent } from './routes/contact/contact.component';
import { CotizacionComponent } from './routes/cotizacion/cotizacion.component';
import { TerminosComponent } from './routes/terminos/terminos.component';
import { LoadingTableComponent } from './components/loading-table/loading-table.component';
import { AsistenciasOpcionalesComponent } from './routes/asistencias-opcionales/asistencias-opcionales.component';
import { MascotasComponent } from './routes/mascotas/mascotas.component';
import { AddPetComponent } from './routes/add-pet/add-pet.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cotizacion/:id_pet', component: CotizacionComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'asistencias-opcionales/:id', component: AsistenciasOpcionalesComponent },
  { path: 'asistencias-opcionales', component: AsistenciasOpcionalesComponent },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'terminos', component: TerminosComponent },
  {path: "add-pet", component: AddPetComponent },
  { path: '**', redirectTo: '' },
];
