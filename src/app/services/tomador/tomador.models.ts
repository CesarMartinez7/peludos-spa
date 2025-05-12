

export default interface ResponseGetTypeDocument {
    responseCode: number;
    message: string;
    data: Data[];
}

export interface Data {
    id: number
    name: string
}


export interface SetRequestBodyTomador {
    id_managment:       string | null
    first_name:         string
    middle_name:        string
    last_name:          string
    second_surname:     string
    type_document:      string
    document:           string
    email:              string
    communications:      boolean
    front_version:      string
}



export interface ResponseBodyTomador {
    responseCode: number
    message: string
    data: DataResponseTomador[]
}


interface DataResponseTomador {
    id_name: string
}