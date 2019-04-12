import React from 'react'
import { Pie } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels';
import './piechart.css'

// eslint-disable-next-line react/prefer-stateless-function
class PieChart extends React.Component {
  constructor(props) {
    super(props)  
  }

  render() {
    const {dailyFats, dailyProteins, dailyCarbs } = this.props
    const total = parseFloat(dailyFats) + parseFloat(dailyCarbs) + parseFloat(dailyProteins)

    const data = {
      labels: ['Fat', 'Protein', 'Carbs'],
      datasets: [
        {
          data: [dailyFats, dailyProteins, dailyCarbs],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    }

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
      },

      plugins: {
        datalabels: {
          formatter: function(value, context) {

            return Math.round((value/total)*100) + '%';
           },
          color: 'white'
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

export default PieChart;
