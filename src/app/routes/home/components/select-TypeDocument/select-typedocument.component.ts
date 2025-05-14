import { Component, inject, Input, Output } from "@angular/core"
import { TomadorService } from "../../../../services/tomador/tomador.service"
import ResponseGetTypeDocument from "../../../../services/tomador/tomador.models"
import { CommonModule } from "@angular/common"
import { Data } from "../../../../services/tomador/tomador.models"
import { EventEmitter } from "@angular/core"


@Component({
    selector: "home-select-document",
    templateUrl: "./select-typedocument.component.html",
    imports: [CommonModule]
})

export class SelectTypeDocument {
    @Input() isClose: boolean = true
    @Output() seleccionado = new EventEmitter<Data>()

    ServicesTomador = inject(TomadorService)
    DocumentsAvalibleResponse!: ResponseGetTypeDocument

    ngOnInit(): void {
        this.ServicesTomador.getDocumentsTypes().subscribe((response) => {
            if(response.responseCode === 200){
                this.DocumentsAvalibleResponse = response
            }else{
                throw new Error("Error en la peticion")
            }
        })
    }

    seleccionar(item: Data){
        this.seleccionado.emit({id: item.id, name: item.name })
        this.isClose = true
    }

}