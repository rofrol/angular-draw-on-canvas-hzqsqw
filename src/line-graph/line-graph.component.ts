import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-line-graph",
  templateUrl: "./line-graph.component.html",
  styleUrls: ["./line-graph.component.css"]
})
export class LineGraphComponent implements OnInit {
  @ViewChild("vfTestPointsCanvas") vfTestPointsCanvas: ElementRef;
  @ViewChild("graphCanvas") graphCanvas: ElementRef;
  ctx: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
  canvasEl: HTMLCanvasElement;
  canvasGraphEl: HTMLCanvasElement;

  constructor() {}

  ngOnInit() {
    this.canvasEl = this.vfTestPointsCanvas.nativeElement;
    this.ctx = this.canvasEl.getContext("2d");
    this.ctx.fillStyle = "#000000"; // text color
    this.ctx.font = "20 pt Verdana";

    this.canvasGraphEl = this.graphCanvas.nativeElement;
    this.ctx2 = this.canvasGraphEl.getContext("2d");

    this.testGraph();
    this.testGraphNew();
  }

  testGraph(): void {
    let context;
    let xScale;
    let yScale;

    // Values for the Data Plot, they can also be obtained from a external file
    const Apple = [100, 102, 87, , 100, 123, 100, 90, 87, 91, 93, 88];
    const Samsung = [30, 50, 70, 80, 90, 100, 95, 91, 85, 92, 99, 130];
    const Nokia = [20, -10, -20, -25, -40, 5, 10, 28, 30, 43, 65, 80];

    // set these values for your data
    const sections = 12;
    const val_max = 30;
    const val_min = -30;
    const stepSize = 10;
    const columnSize = 30;
    const rowSize = 50;
    const margin = 15;
    const marginLeft = 30;
    const marginBottom = 0;
    const xAxis = [
      " ",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    yScale = (this.canvasEl.height - columnSize - margin) / (val_max - val_min);
    xScale = (this.canvasEl.width - rowSize) / sections;

    this.ctx.strokeStyle = "#000000"; // color of grid lines
    this.ctx.beginPath();

    //var rectangle = new Path2D();
    //rectangle.rect(10, 10, 50, 50);
    //this.ctx.stroke(rectangle);

    // left vert line
    this.ctx.moveTo(rowSize, columnSize);
    this.ctx.lineTo(rowSize, this.canvasEl.height - 14);
    // right vert line
    this.ctx.moveTo(this.canvasEl.width, columnSize);
    this.ctx.lineTo(this.canvasEl.width, this.canvasEl.height - 12);

    // x axis values
    // let countX = 0;
    // for (let scale = val_min; scale <= val_max; scale = scale + stepSize) {
    //   const x = 60 + yScale * countX * stepSize;
    //   this.ctx.fillText(scale.toString(), x, this.canvasEl.height);
    //   countX += 1;
    // }

    // draw months below X axis
    for (let i = 1; i <= sections; i += 1) {
      const x = i * xScale;
      this.ctx.fillText(xAxis[i], x + 25, this.canvasEl.height + marginBottom);
    }

    // top/bottom horizontal lines
    // this.ctx.moveTo(rowSize, columnSize);
    // this.ctx.lineTo(this.canvasEl.width, columnSize);
    // this.ctx.moveTo(rowSize, this.canvasEl.height - 12);
    // this.ctx.lineTo(this.canvasEl.width, this.canvasEl.height - 12);

    //this.ctx.stroke();

    // draw row header and draw horizontal tick lines
    let count = 0;
    for (let scale = val_max; scale >= val_min; scale = scale - stepSize) {
      const y = columnSize + yScale * count * stepSize;
      // this.ctx.textAlign = "left";
      this.ctx.fillText(scale.toString(), marginLeft, y + 4);
      this.ctx.moveTo(rowSize, y);
      this.ctx.lineTo(this.canvasEl.width, y);
      count += 1;
    }
    this.ctx.stroke();
  }

  testGraphNew() {
    var grid_size = 35;
    var x_axis_distance_grid_lines = 0; // the main x-axis
    var y_axis_distance_grid_lines = 0; // the main y-axis
    var x_axis_starting_point = { number: 10, suffix: "" }; // '\u03a0'
    var y_axis_starting_point = { number: 10, suffix: "" };

    const leftGridMargin = 35;
    const rightGridMargin = 15;
    const topGridMargin = 10;
    const bottomGridMargin = 20;

    var canvas_width = this.canvasGraphEl.width;
    var canvas_height = this.canvasGraphEl.height;

    var num_lines_x = Math.floor(canvas_height / grid_size);
    var num_lines_y = Math.floor(canvas_width / grid_size);

    //var rectangle = new Path2D();
    //rectangle.rect(leftGridMargin, 0, canvas_width - 40, canvas_height - 40);
    //this.ctx2.stroke(rectangle);

    // top hor line (fyi: 0.5 makes a crisp line)
    this.ctx2.beginPath();
    this.ctx2.moveTo(leftGridMargin, topGridMargin + 0.5);
    this.ctx2.lineTo(canvas_width - rightGridMargin, topGridMargin + 0.5);
    // bottom hor line
    this.ctx2.moveTo(
      leftGridMargin,
      grid_size * num_lines_x - bottomGridMargin
    );
    this.ctx2.lineTo(
      canvas_width - rightGridMargin,
      grid_size * num_lines_x + 0.5 - bottomGridMargin
    );
    this.ctx2.stroke();

    // if we need to draw all grid lines along X-axis
    // for(let i=0; i<=num_lines_x; i++) {
    //     if(i == num_lines_x) { // bottom line
    //       this.ctx2.moveTo(0, grid_size*i);
    //       this.ctx2.lineTo(canvas_width, grid_size*i);
    //     }
    //     else {
    //         this.ctx2.moveTo(0, grid_size*i+0.5);
    //         this.ctx2.lineTo(canvas_width, grid_size*i+0.5);
    //     }
    //     this.ctx2.stroke();
    // }

    // left vert line
    this.ctx2.beginPath();
    this.ctx2.moveTo(leftGridMargin, topGridMargin + 0.5);
    this.ctx2.lineTo(leftGridMargin, canvas_height - 40);
    // right vert line
    this.ctx2.moveTo(canvas_width - rightGridMargin, topGridMargin);
    this.ctx2.lineTo(canvas_width - rightGridMargin, canvas_height - 40);
    this.ctx2.stroke();

    // Draw grid lines along Y-axis
    for (let i = 0; i <= num_lines_y; i++) {
      this.ctx2.beginPath();
      this.ctx2.lineWidth = 1;

      if (i == num_lines_y) {
        // right vert line
        // this.ctx2.moveTo(grid_size*i, 0);
        // this.ctx2.lineTo(grid_size*i, canvas_height - 33);
      }
      if (i === y_axis_distance_grid_lines) {
        // left vert
        //this.ctx2.moveTo(leftGridMargin + (grid_size*i+0.5), 0);
        //this.ctx2.lineTo(leftGridMargin + (grid_size*i+0.5), canvas_height - 33 );
      }
      this.ctx2.stroke();
    }

    // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
    //this.ctx2.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

    // Ticks marks along the positive X-axis
    for (let i = 1; i < num_lines_y - y_axis_distance_grid_lines; i++) {
      this.ctx2.beginPath();
      this.ctx2.lineWidth = 1;
      this.ctx2.strokeStyle = "#000000";

      // Draw a tick mark 6px long (-3 to 3)
      // this.ctx2.moveTo(grid_size*i+0.5, -3);
      // this.ctx2.lineTo(grid_size*i+0.5, 3);
      this.ctx2.moveTo(grid_size * i + 0.5, canvas_height - 35);
      this.ctx2.lineTo(grid_size * i + 0.5, canvas_height - 40);
      this.ctx2.stroke();

      // Text value at that point
      this.ctx2.font = "9px Arial";
      this.ctx2.textAlign = "start";
      // this.ctx2.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i-2, 15);
      this.ctx2.fillText(
        x_axis_starting_point.number * i + x_axis_starting_point.suffix,
        grid_size * i + 0.5,
        canvas_height - bottomGridMargin
      );
    }

    // Ticks marks along the positive Y-axis
    // Positive Y-axis of graph is negative Y-axis of the canvas
    for (let i = 1; i < num_lines_x - x_axis_distance_grid_lines; i++) {
      this.ctx2.beginPath();
      this.ctx2.lineWidth = 1;
      this.ctx2.strokeStyle = "#000000";

      // Draw a tick mark 6px long (-3 to 3)
      this.ctx2.moveTo(leftGridMargin, grid_size * i + 0.5);
      this.ctx2.lineTo(leftGridMargin + 5, grid_size * i + 0.5);
      this.ctx2.stroke();

      // Text value at that point
      this.ctx2.font = "9px Arial";
      //this.ctx2.textAlign = 'start';
      this.ctx2.fillText(
        y_axis_starting_point.number * i + y_axis_starting_point.suffix,
        leftGridMargin - 14,
        grid_size * i + 3
      );
    }
  }
}
