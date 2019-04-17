import React from 'react'
import { Pie } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels';
import { chartColors } from '../../App/constants'

// eslint-disable-next-line react/prefer-stateless-function
class PieChart extends React.Component {

  render() {
    const {dailyFats, dailyProteins, dailyCarbs } = this.props
    const total = parseFloat(dailyFats) + parseFloat(dailyCarbs) + parseFloat(dailyProteins)

    const data = {
      labels: ['Fat', 'Protein', 'Carbs'],
      datasets: [
        {
          data: [dailyFats, dailyProteins, dailyCarbs],
          backgroundColor: [chartColors.red, chartColors.green, chartColors.blue],
          hoverBackgroundColor: [chartColors.red, chartColors.green, chartColors.blue]
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
          boxWidth: 13,
          fontSize: 17,
          fontColor: 'rgb(255,255,255)'
        },
      },
      tooltips: false,
      plugins: {
        datalabels: {
          formatter: (value) => {
            if (total && value !== 0) {
              return `${Math.round((value/total)*100)} %`
            }
            return "" 
           },
          color: 'white'
        }
     }
    }


    return (
      <div className="piechart">
        <Pie data={data} options={options} width={300} height={300}/>
      </div>
    )
  }
}

export default PieChart;
