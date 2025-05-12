export interface ResponseAsistenciasOpcionales {
    responseCode: number;
    message: string;
    data: Daum[];
  }
  
  export interface Daum {
    id: number;
    name: string;
    value: number;
    assistances: Assistance[];
    status: boolean;
  }
  
  export interface Assistance {
    assistance_name: string;
    description: Description[];
  }
  
  export interface Description {
    insured_value: string;
    year_event: string;
  }