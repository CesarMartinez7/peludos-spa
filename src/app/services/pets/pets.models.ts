export interface Response {
  responseCode: number;
  message: string;
  data: Array<DataResponseRaces>;
}
export interface ObjectRace {
  id_race: number;
  name: string;
}

export interface DataResponseRaces {
  dog_races: ObjectRace[];
  cat_races: ObjectRace[];
}

// Creacion de fomulario de peludo -> Home -> home.component.ts -> Fomulario de peludo q van junto al de tomador
export interface RequestBodyPeludo {
  name: string;
  type_pet: string;
  gender: string;
  type_age: string;
  age: number;
  race: string;
  auth: boolean;
  id_managment: string;
  front_version: string;
}

export interface ResponseSetPeludo {
  responseCode: number;
  message: string;
  data: Array<DataResponseSetPeludo>;
}
interface DataResponseSetPeludo {
  id_managment: string;
  id_pet: string;
}

// Cambio de los planes del peludo -> Paquetes de asistencias personales -> asistencias-opcionales.component.ts

export interface BodyRequestAddSetPlan {
  id_managment: string;
  id_pet: string;
  id_plan: number;
  optional_assistances: number[];
  front_version: string;
}

export interface ResponseAddSetPeludo {
  responseCode: number;
  message: string;
  data: string[];
}

/// Macotas ruta


interface Data {
  id_managment: string;
  id_pet: string;
}

export interface BodyRequestConfirmPlanPet {
  front_version: string;
  id_managment: string;
}

export interface ResponseConfirmPlanPet {
  responseCode: number;
  message: string;
  data: DataResponsePlanPet[];
}

export interface DataResponsePlanPet {
  info_pets: InfoPetConfirmPlanPet[];
  total: number;
}

export interface InfoPetConfirmPlanPet {
  id_pet: string;
  type_pet:  string;
  cod_type_pet: number;
  name: string;
  age: number;
  type_age: string;
  gender: string;
  id_gender: number;
  race: string;
  plan: string;
  plan_value: number;
  total_value: number;
  prima: string | number;
  validity_start: string;
  validity_until: string;
  assistances: AsistencesInfoPetConfirmPlanPet[];
  recentlyAdded: boolean;
  total: number;
}

export interface AsistencesInfoPetConfirmPlanPet {
  id_paquete: number;
  nombre: string;
  commercial_name: string;
  valor: number;
}
