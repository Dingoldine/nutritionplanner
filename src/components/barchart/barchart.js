import React from 'react'
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-zoom'
import './barchart.css'
import dateFormat from 'dateformat'
import Hammer from 'hammerjs';



function newDate(offset) {
    const date = new Date();
    //var d = new Date(date);
    date.setDate(date.getDate() + offset);
    console.log(dateFormat(date, "isoDate", true));
    return dateFormat(date, "isoDate", true)
}

const options ={
    type: "bar",
    responsive: true,
    legend: {
        position: 'bottom',
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

 const data ={ 
    labels: [
        newDate(-10),
        newDate(-9),
        newDate(-8),
        newDate(-7),
        newDate(-6),
        newDate(-5),
        newDate(-4),
        newDate(-3),
        newDate(-2),
        newDate(-1),
        newDate(0),
    ],
    datasets:[
        // trendline
        {
            label: 'Line Dataset',
            data: [40,20,30,40,20,30,40,20,30,40,20],

            // Changes this dataset to become a line
            type: 'line',
            //  No Fill color
            fill: false
        },
        //  barcharts
        {   
            label: 'protein',
            data: [40,20,30,40,20,30,40,20,30,40,20],
            backgroundColor: '#7eddb1',
            borderColor: "#7eddb1",
        },
        {   

            label: 'fats',
            data: [40,20,30,40,20,30,40,20,30,40,20],
            backgroundColor: '#3f51b5',
            borderColor: "#3f51b5",
        },
        {   

            label: 'carbs',
            data: [40,20,30,40,20,30,40,20,30,40,20],
            backgroundColor: '#c53255',
            borderColor: "#c53255",
        }
       ],
 }


class BarChart extends React.Component {
    constructor(props) {
      super(props)  
    }
    

     
     render(){
       return  (
       <div className="barchart-container">
        <Bar  data={data} options={options} />
       </div>
        
        )
     }


}

export default BarChart;