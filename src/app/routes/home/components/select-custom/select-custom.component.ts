import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectRace} from '../../../../services/pets/pets.models';
import { FormControlName } from '@angular/forms';
import { Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

interface KeysResponse {
  id_race: number
  name: string
}

@Component({
  selector: 'app-select-custom',
  imports: [CommonModule],
  templateUrl: './select-custom.component.html',
  styleUrl: './select-custom.component.css'
})




export class SelectCustomComponent {
  @Input() data! : ObjectRace[]
  @Output() seleccionadoId = new EventEmitter<ObjectRace>();
  @Input() keys = []
  @Input() formControlName! : FormControl
  @Input() isClose: boolean = true
  @Input() isLoading: boolean = true
  @Input() classSelect : string = ""

  ArrayPrueba = [1,3,4,5,6,6,7,7,4,4,4,3,34]
  
  seleccionar(item: ObjectRace){
    this.seleccionadoId.emit({id_race: item.id_race, name: item.name })
    this.isClose = false
  }

}
