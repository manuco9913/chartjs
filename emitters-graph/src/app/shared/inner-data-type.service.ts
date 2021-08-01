import { Injectable } from '@angular/core';
import { BubbleDataPoint } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class InnerDataTypeService implements BubbleDataPoint {
  
  constructor() {};

  x: number;
  y: number;
  r: number;
  status: string;
  ident: string;
  isValid: boolean;
  
  setEmitterParamsTo (param: InnerDataTypeService | null): void {
    if (!param) {
      this.isValid = false;
      return;
    }
    this.isValid = true;
    this.x = param.x;
    this.y = param.y;
    this.r = param.r;
    this.status = param.status;
    this.ident = param.ident;
    return;
  };

}
