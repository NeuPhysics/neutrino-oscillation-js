function eigenState(energyVal, masssquaredVal, mixangleVal, densityVal, initstateVal) {
   var omegav = (masssquaredVal)/(2*energyVal); //In unit of 10^(-17) MeV, which corresponds to 5.1*10^(-4) m^(-1) = 0.51 km^(-1)
   omegav = omegav * 0.51; // (omegav * 0.51 ) is the vacuum frequency in unit of km^(-1)
   var fermi = 1.17; // in unit of 10^(-17)MeV^-2; G = 1.17*10^(-17)MeV^(-2)
   var density = densityVal/2; // densityVal is in unit of cm^-3; density is in unit of 10^(12) km^-3, divided by 2 because we are removing the trace of the Hamiltonian.
   var potential = Math.sqrt(2) * density * fermi * 0.388;// in unit of km^-1; 0.388 = 10^-5 * 197^2
   var s2thetav = Math.sin( 2 * mixangleVal );
   var c2thetav = Math.cos( 2 * mixangleVal );
   var omegam = Math.sqrt( Math.pow(omegav,2) + Math.pow(potential,2) -2 * omegav * potential * c2thetav );
   var s2thetam = omegav * s2thetav /( omegam );
   var thetam = Math.asin(s2thetam) / 2;
   var sthetam = Math.sin(thetam), cthetam = Math.cos(thetam);

   var nue = Math.sqrt(initstateVal), nux = 0;
   var nuL = Math.pow(sthetam * nue + cthetam * nux, 2), nuH = Math.pow(cthetam * nue - sthetam * nux, 2);

   return [nuL, nuH]
}


function constMatterData(energyVal, masssquaredVal, mixangleVal, densityVal, initstateVal, begVal,endVal, stepsVal) {

  var size = stepsVal, x = new Array(size), y = new Array(size), x2 = new Array(size), y2 = new Array(size), xL = new Array(size), yL = new Array(size), xH = new Array(size), yH = new Array(size), i, j;

  var omegav = (masssquaredVal)/(2*energyVal); //In unit of 10^(-17) MeV, which corresponds to 5.1*10^(-4) m^(-1) = 0.51 km^(-1)
  omegav = omegav * 0.51; // (omegav * 0.51 ) is the vacuum frequency in unit of km^(-1)
  var fermi = 1.17; // in unit of 10^(-17)MeV^-2; G = 1.17*10^(-17)MeV^(-2)
  var density = densityVal/2; // densityVal is in unit of cm^-3; density is in unit of 10^(12) km^-3, divided by 2 because we are removing the trace of the Hamiltonian.
  var potential = Math.sqrt(2) * density * fermi * 0.388;// in unit of km^-1; 0.388 = 10^-5 * 197^2
  var s2thetav = Math.sin( 2 * mixangleVal );
  var c2thetav = Math.cos( 2 * mixangleVal );
  var omegam = Math.sqrt( Math.pow(omegav,2) + Math.pow(potential,2) -2 * omegav * potential * c2thetav );
  var s2thetam = omegav * s2thetav /( omegam );
  // var thetam = Math.asin(s2thetam) / 2;

  var relativeLength = endVal - begVal; // in unit of km

  var eigenstates = eigenState(energyVal, masssquaredVal, mixangleVal, densityVal, initstateVal);

  for(var i = 0; i < size; i++) {
     x[i] = x2[i] = xL[i] = xH[i] = relativeLength * i / size;
     y[i] = 1 - Math.pow( s2thetam, 2 ) * Math.pow( Math.sin( omegam  * x[i] / 2 ), 2 );
     y2[i] = 1-y[i];
     yL[i] = eigenstates[0];
     yH[i] = eigenstates[1];
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

  var traceL = {
     x: xL,
     y: yL,
     mode: 'lines',
     name: 'Light State Survival Probabilities',
     line: {
       dash: 'dash',
       width: 2,
       color: 'red'
     }
  };

  var traceH = {
     x: xH,
     y: yH,
     mode: 'lines',
     name: 'Heavy State Survival Probabilities',
     line: {
       dash: 'dash',
       width: 2,
       color: 'black'
     }
  };
  return [trace1, trace2, traceL, traceH]
}


function plot(energyVal,masssquaredVal, mixangleVal, densityVal, initstateVal, begVal,endVal,stepsVal){
   var data = constMatterData(energyVal,masssquaredVal, mixangleVal, densityVal, initstateVal, begVal,endVal,stepsVal)



   var layout = {
        title: 'Neutrino Oscillations with Matter Potential',
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

   Plotly.newPlot('const-matter-oscillations-plot', data, layout);
}




var vm = new Vue({
  el: '.vacuum',
  data: {
    message: 'Plotting Vacuum Oscillations',
    energy: 1,
    masssquared: 7.53,
    mixangle: 0.59,
    density: 1e+1,
    initstate: 1,
    endpoint: 10
   },
   mounted: function () {
      this.execplot()
   },
   methods: {
      execplot: function (){
         plot(this.energy, this.masssquared,this.mixangle, this.density,this.initstate,0, this.endpoint, 10000)
      }

   },
   computed: {

   }
})
