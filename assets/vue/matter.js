function vacData(energyVal, masssquaredVal, mixangleVal, initstateVal, begVal,endVal, stepsVal) {
  var size = stepsVal, x = new Array(size), y = new Array(size), x2 = new Array(size), y2 = new Array(size), i, j;

  var omegav = (masssquaredVal)/(2*energyVal);
  var relativeLength = endVal - begVal;

  for(var i = 0; i < size; i++) {
     x[i] = x2[i] = relativeLength * i / size;
     y[i] = 1 - 0.5 * Math.pow(Math.sin( 2 * mixangleVal ), 2 ) * Math.pow( Math.sin( omegav* relativeLength * i / size / 2 ), 2 );
     y2[i] = 1-y[i];
  }

  var trace1 = {
     x: x,
     y: y,
     mode: 'lines',
     name: 'Electron Flavor Survival Probabilities',
     line: {
       dash: 'solid',
       width: 4
     }
  };

  var trace2 = {
     x: x2,
     y: y2,
     mode: 'lines',
     name: 'Muon Flavor Survival Probabilities',
     line: {
       dash: 'dashdot',
       width: 4
     }
  };

  return [trace1, trace2]
}

function plot(energyVal,masssquaredVal, mixangleVal, initstateVal, begVal,endVal,stepsVal){
   var data = vacData(energyVal,masssquaredVal, mixangleVal, initstateVal, begVal,endVal,stepsVal)



   var layout = {
        title: 'Vacuum Oscillations',
        xaxis: {
          range: [begVal, endVal],
          autorange: false
        },
        yaxis: {
          range: [-0.02, 1.02],
          autorange: false
        },
        showlegend: true,
        legend: {
          "orientation": "h"
        }
      };

   Plotly.newPlot('vacuum-oscillations-plot', data, layout);
}




var vm = new Vue({
  el: '.vacuum',
  data: {
    message: 'Plotting Vacuum Oscillations',
    energy: 1,
    masssquared: 7.53,
    mixangle: 0.59,
    initstate: 1,
    endpoint: 10
   },
   mounted: function () {
      this.execplot()
   },
   methods: {
      execplot: function (){
         plot(this.energy, this.masssquared,this.mixangle,this.initstate,0, this.endpoint, 1000)
      }

   },
   computed: {

   }
})
