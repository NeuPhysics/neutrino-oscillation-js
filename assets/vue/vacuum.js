function vacData(energyVal, masssquaredVal, mixangleVal, initstateVal, begVal,endVal, stepsVal) {
  var size = stepsVal, x = new Array(size), y = new Array(size), x2 = new Array(size), y2 = new Array(size), i, j;

  var omegav = (masssquaredVal)/(2*energyVal); //In unit of 10^(-17) MeV, which corresponds to 5.1*10^(-4) m^(-1) = 0.51 km^(-1)
  var relativeLength = endVal - begVal; // in unit of km

  for(var i = 0; i < size; i++) {
     x[i] = x2[i] = relativeLength * i / size;
     y[i] = 1 - Math.pow(Math.sin( 2 * mixangleVal ), 2 ) * Math.pow( Math.sin( (omegav * 0.51 ) * x[i] / 2 ), 2 ); // (omegav * 0.51 ) is the vacuum frequency in unit of km^(-1)
     y2[i] = 1-y[i];
  }

  var trace1 = {
     x: x,
     y: y,
     mode: 'lines',
     name: 'Electron Flavor Survival Probabilities',
     line: {
       dash: 'solid',
       width: 4,
       color: 'black'
     }
  };

  var trace2 = {
     x: x2,
     y: y2,
     mode: 'lines',
     name: 'Muon Flavor Survival Probabilities',
     line: {
       dash: 'dashdot',
       width: 4,
       color: 'red'
     }
  };

  return [trace1, trace2]
}

function plot(energyVal,masssquaredVal, mixangleVal, initstateVal, begVal,endVal,stepsVal){
   var data = vacData(energyVal,masssquaredVal, mixangleVal, initstateVal, begVal,endVal,stepsVal)



   var layout = {
        title: 'Vacuum Oscillations',
        xaxis: {
           title: 'Distance (km)',
          range: [begVal, endVal],
          autorange: false
        },
        yaxis: {
           title: 'Survival Probability',
          range: [-0.02, 1.02],
          autorange: false
        },
        showlegend: true,
        legend: {
          "orientation": "h",
          x: 0.3,
          y: -0.3
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
         plot(this.energy, this.masssquared,this.mixangle,this.initstate,0, this.endpoint, 10000)
      }

   },
   computed: {

   }
})
