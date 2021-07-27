import { BubbleController, Chart, TooltipItem } from 'chart.js';

export class CustomDataTypeService {

  constructor(x = 0, y: any, r: any, arr: any) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.arr = arr;
  }

  x: number;
  y: number;
  
  // Bubble radius in pixels (not scaled).
  r: number;

  // additional values
  arr: string[];
}

class myBubbleC extends BubbleController {


};
myBubbleC.id = 'derivedBubble';
// myBubbleC.defaults = {
//   // datasetElementType: CustomDataType,
//   // dataElementType: CustomDataType,
// };

// Stores the controller so that the chart initialization routine can look it up
Chart.register(myBubbleC);