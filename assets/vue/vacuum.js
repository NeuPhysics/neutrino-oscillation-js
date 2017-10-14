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


function plotVector() {

   var n = 100;
   var x = [], y = [], z = [];
   var dt = 0.015;

   for (i = 0; i < n; i++) {
     x[i] = Math.random() * 2 - 1;
     y[i] = Math.random() * 2 - 1;
     z[i] = 30 + Math.random() * 10;
   }

   Plotly.plot('vacuum-vector-plot', [{
     x: x,
     y: y,
     z: z,
     mode: 'markers',
     type: 'scatter3d'
   }], {
     xaxis: {range: [-40, 40]},
     yaxis: {range: [0, 60]},
     zaxis: {range: [-100, 100]},
   })

   function compute () {
     var s = 10, b = 8/3, r = 28;
     var dx, dy, dz;
     var xh, yh, zh;
     for (var i = 0; i < n; i++) {
       dx = s * (y[i] - x[i]);
       dy = x[i] * (r - z[i]) - y[i];
       dz = x[i] * y[i] - b * z[i];

       xh = x[i] + dx * dt * 0.5;
       yh = y[i] + dy * dt * 0.5;
       zh = z[i] + dz * dt * 0.5;

       dx = s * (yh - xh);
       dy = xh * (r - zh) - yh;
       dz = xh * yh - b * zh;

       x[i] += dx * dt;
       y[i] += dy * dt;
       z[i] += dz * dt;
     }
   }

   function update () {
     compute();

     Plotly.animate('vacuum-vector-plot', {
       data: [{x: x, y: y, z: z}]
     }, {
       transition: {
         duration: 0
       },
       frame: {
         duration: 0,
         redraw: false
       }
     });

     requestAnimationFrame(update);
   }

   requestAnimationFrame(update);


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
      this.execplot();
      // plotVector();
   },
   methods: {
      execplot: function (){
         plot(this.energy, this.masssquared,this.mixangle,this.initstate,0, this.endpoint, 10000)
      }

   },
   computed: {

   }
})
