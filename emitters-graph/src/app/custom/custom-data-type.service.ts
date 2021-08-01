import { BubbleDataPoint } from 'chart.js';

export class InnerDataType implements BubbleDataPoint{

  // -- copy ctor
  constructor(param: InnerDataType) {
    this.x = param.x;
    this.y = param.y;
    this.r = param.r;
    this.status = param.status;
    this.ident = param.ident;
  }

  x: number;
  y: number;
  r: number;
  status: string;
  ident: string
}