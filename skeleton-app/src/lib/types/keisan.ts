export enum OperationType {
  Add = "たし算",
  Sub = "ひき算",
  Mul = "かけ算",
  Div = "わり算",
}

export interface NumberRange {
  min: number;
  max: number;
}

export interface KeisanValue {
  label: string;
  range: NumberRange;
  allowNegative: boolean;
  decimalPlaces: number;
}

export interface KeisanTemplate extends KeisanValue {
  operationType: OperationType;
}

export interface KeisanData {
  index: number;
  title: string;
  data: KeisanTemplate[];
}
