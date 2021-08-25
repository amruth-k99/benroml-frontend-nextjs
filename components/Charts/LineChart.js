import React, { Component } from "react";
import { Line } from "react-chartjs-2";

export default class LineDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            label: "Weight at this week",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [3, 3],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 4,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.weights,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 35,
                suggestedMax: 120,
              },
            },
          ],
        },
      },
    };
  }

  render() {
    return (
      <div>
        <Line ref="chart" data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}
