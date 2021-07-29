import { BubbleController, BubbleDataPoint, Chart } from 'chart.js';

export class InnerDataType implements BubbleDataPoint{
  x: number;
  y: number;
  r: number;
  status: string;
  ident: string
}
export class MyBubbleChart extends BubbleController {

  // defaults: {
  //   //datasetElementType: string | null | false,

  //   dataElementType: InnerDataType | null
  // }

  // id: 'derivedBubble'

};
MyBubbleChart.id = 'derivedBubble';
MyBubbleChart.defaults = {
  // datasetElementType: CustomDataType,
  dataElementType: InnerDataType,
};



// Stores the controller so that the chart initialization routine can look it up
Chart.register(MyBubbleChart);