import React from 'react'
import { Pie } from 'react-chartjs-2'

const data = {
  labels: ['Fat', 'Protein', 'Carbs'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
}

// eslint-disable-next-line react/prefer-stateless-function
export default class PieChart extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const options = {
      annotation: {
        annotations: [
          {
            drawTime: 'afterDatasetsDraw',
            borderColor: 'red',
            borderDash: [2, 2],
            borderWidth: 2,
            mode: 'vertical',
            type: 'line',
            value: 10,
            scaleID: 'x-axis-0'
          }
        ]
      },

      maintainAspectRatio: false,
      responsive: false,
      legend: {
        position: 'left',
        labels: {
          boxWidth: 10
        }
      }
    }

    return (
      <div>
        <Pie data={data} options={options} width={300} height={300} />
      </div>
    )
  }
}
