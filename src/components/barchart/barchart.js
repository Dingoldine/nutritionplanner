import React from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-zoom'
import './barchart.css'
import Hammer from 'hammerjs';
import { chartColors } from '../../app/constants'

const options ={
    type: "bar",
    responsive: true,
    legend: {
        position: 'bottom',
    },
    tooltips: {
        callbacks: {
           label: function(t, d) {
              var xLabel = d.datasets[t.datasetIndex].label;
              var yLabel = t.yLabel;

              return xLabel + ":  " + yLabel.toFixed(0) +  " kCal";
           }
        }
     },
    title: {
        display: true,
        text: 'Timeline Overview'
    },
    scales: {
        xAxes: [{
            stacked: true,
            gridLines: {
                display: true,   
            },
            //  barPercentage: 0.3,
            barPercentage: 1,
            categoryPercentage: 1,
            barThickness: 6,
            maxBarThickness: 10,
            // barThickness: "flex",
            ticks: {
                maxRotation: 0,
                autoSkip: true, 
                maxTicksLimit:50,
                source: 'auto'
            },
            type: "time",
            time: {
                //  min: '2',
                displayFormats: {
                    day: 'MMM DD'
                },
                minUnit: "day",
                //  min: 1471174953000,
                //  max: 1473853353000,
                parser: "YYYY-MM-DD",
                // round: 'day'
                tooltipFormat: "MM-DD"
            },
            offset: true
        }],
    	yAxes: [{
      	    stacked: true,
      	    ticks: {
        	    beginAtZero: true 
            },
            gridLines: {
                display:true
            }
            }]
    },
    plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: 'x',
             },
             zoom: {
                enabled: true,
                sensitivity:0.5,
                mode: 'x',
                rangeMin: {
                    // Format of min zoom range depends on scale type
                    x: "MM-DD",
                    y: null
                },
                rangeMax: {
                    // Format of max zoom range depends on scale type
                    x: null,
                    y: null
                }
             }
        },
        datalabels: {
            display: function(context) {
               return null
            }
         }
    }
}


const calsPerGramFat = 9
const calsPerGramProtein = 4
const calsPerGramCarbs = 4

// eslint-disable-next-line react/prefer-stateless-function
class BarChart extends React.Component {
    constructor(props) {
      super(props)
    }

     render(){
        const {timelineOverviewData} = this.props

        const xAxisLabels = []
        const carbsData = []
        const proteinData = []
        const fatsData = []
        const lineChartData = []
        function extractMapElements(nutrients, dateString, map) {
            xAxisLabels.push(dateString)
            const carbCalories = nutrients.carbs * calsPerGramCarbs
            const proteinCalories = nutrients.protein * calsPerGramProtein
            const fatsCalories = nutrients.fats * calsPerGramFat
            carbsData.push(carbCalories)
            proteinData.push(proteinCalories)
            fatsData.push(fatsCalories)
            lineChartData.push(nutrients.calories)
        }

        timelineOverviewData.forEach(extractMapElements)

        const data ={ 
            labels: xAxisLabels,
            datasets:[
                // trendline
                // {   
                //     type: 'line',
                //     label: 'Calories',
                //     data: lineChartData,
                //     backgroundColor: chartColors.gray,
                //     borderColor: chartColors.gray,  
                //     fill: true              
                // },
                //  barcharts
                {   
                    tyoe: 'bar',
                    label: 'protein',
                    data: proteinData,
                    backgroundColor: chartColors.green,
                    borderColor: chartColors.green,
                },
                {   
                    tyoe: 'bar',
                    label: 'fats',
                    data: fatsData,
                    backgroundColor: chartColors.red,
                    borderColor: chartColors.red,
                },
                {   
                    tyoe: 'bar',
                    label: 'carbs',
                    data: carbsData,
                    backgroundColor: chartColors.blue,
                    borderColor: chartColors.blue,
                }
               ],
         }


        return  (
        <div className="barchart-container">
            <Bar  data={data} options={options} />
        </div>
            )
     }
}

export default BarChart;