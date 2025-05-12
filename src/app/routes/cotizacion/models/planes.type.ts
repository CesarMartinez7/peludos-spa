
export interface ResponseTable {
    responseCode: number;
    message:      string;
    data:         Datum[];
  }
  
  export interface Datum {
    plans:                     Plan[];
    annual_value:              AnnualValue[];
    coverages_and_assistances: CoveragesAndAssistance[];
  }
  
  export interface AnnualValue {
    value_name: string;
    cols:       AnnualValueCol[];
  }
  
  export interface AnnualValueCol {
    value: string;
  }
  
  export interface CoveragesAndAssistance {
    text: string;
    rows: Row[];
  }
  
  export interface Row {
    text: string;
    cols: RowCol[];
  }
  
  export interface RowCol {
    insured_value: string;
    year_event:    string;
  }
  
  export interface Plan {
    value_name: string;
    cols:       PlanCol[];
  }
  
  export interface PlanCol {
    id:   number;
    name: string;
  }
  