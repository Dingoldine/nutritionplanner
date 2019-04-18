import React from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-zoom'
import './barchart.css'
import { chartColors } from '../../App/constants'






const calsPerGramFat = 9
const calsPerGramProtein = 4
const calsPerGramCarbs = 4

// eslint-disable-next-line react/prefer-stateless-function
class BarChart extends React.Component {

     render(){
        const { timelineOverviewData, date } = this.props
        
        const xAxisLabels = []
        const carbsData = []
        const proteinData = []
        const fatsData = []
        const lineChartData = []

        function extractMapElements(nutrients, dateString) {
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


        function addDays(d, days) {
            const copy = new Date(Number(d))
            copy.setDate(d.getDate() + days)
            return copy
        }

        const focusedDate = new Date(date);
        const year = focusedDate.getFullYear();
        const month = focusedDate.getMonth();
        const day = focusedDate.getDate();
        const oneYearFromToday = new Date(year + 1, month, day)
        const oneYearBeforeToday = new Date(year - 1, month, day)

        const oneDayfromToday = addDays(focusedDate, 1);


        const options ={
            type: "bar",
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: 'bottom',
            },
            tooltips: {
                callbacks: {
                   label: (t, d) => {
                      const xLabel = d.datasets[t.datasetIndex].label;
                      const { yLabel } = t;
        
                      return `${xLabel}:  ${Math.round(yLabel)} kCal`
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
                    barPercentage: 1,
                    categoryPercentage: 1,
                    barThickness: 8,
                    //  barThickness: "flex",
                    maxBarThickness: 10,
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true, 
                        maxTicksLimit:50,
                        source: 'auto'
                    },
                    type: "time",
                    time: {
                        min: focusedDate.setDate(focusedDate.getDate() - 6),
                        max: oneDayfromToday,
                        displayFormats: {
                            day: 'MMM DD'
                        },
                        minUnit: "day",
                        parser: "YYYY-MM-DD",
                        tooltipFormat: "MM-DD",
                        unitStepSize: 1,
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
                        rangeMin: {
                            // Format of min pan range depends on scale type
                            x: oneYearBeforeToday,
                            y: null
                        },
                        rangeMax: {
                            // Format of max pan range depends on scale type
                            x: oneYearFromToday,
                            y: null
                        },
                        //  onPan: function({chart}) { console.log(`I was panned!!!`); }
                     },
                     zoom: {
                        enabled: true,
                        sensitivity:0.3,
                        mode: 'x',
                        rangeMin: {
                            // Format of min zoom range depends on scale type
                            x: oneYearBeforeToday,
                            y: null
                        },
                        rangeMax: {
                            // Format of max zoom range depends on scale type
                            x: oneYearFromToday,
                            y: null
                        },
                        //  onZoom: function({chart}) { console.log(chart) ; }
                     }
                },
                datalabels: {
                    display: () => {
                       return null
                    }
                 }
            }
        }

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
                    type: 'bar',
                    label: 'protein',
                    data: proteinData,
                    backgroundColor: chartColors.green,
                    borderColor: chartColors.green,
                },
                {   
                    type: 'bar',
                    label: 'fats',
                    data: fatsData,
                    backgroundColor: chartColors.red,
                    borderColor: chartColors.red,
                },
                {   
                    type: 'bar',
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