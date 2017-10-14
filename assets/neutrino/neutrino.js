// PMNS Matrix
// The Matrix that mix mass eigenstates into flavor eigenstates
// pmns3 is define to be an object
// pmns3 is a real matrix, which is grabbed from wikipedia https://en.wikipedia.org/wiki/Pontecorvo%E2%80%93Maki%E2%80%93Nakagawa%E2%80%93Sakata_matrix



pmns3={e1:0.82, e2:0.54, e3:0.15,
      m1:0.35, m2:0.70, m3:0.62,
      t1:0.44, t2:0.45, t3:0.77};

function DiracDelta(aa,bb) {
      if (aa==bb) {
            return 1
      } else {
            return 0
      }
}

function mass3normPow(m12squareabs,m23squareabs) {
      return {12:-m12squareabs*Math.pow(10,-5), 13:-m23squareabs*Math.pow(10,-3), 21:m12squareabs*Math.pow(10,-5), 23: -m23squareabs*Math.pow(10,-3), 31:m23squareabs*Math.pow(10,-3), 32:m23squareabs*Math.pow(10,-3)};
}

function mass3norm(m12squareabs,m23squareabs) {
      return {12:-m12squareabs*Math.pow(10,-5), 13:-m23squareabs*Math.pow(10,-3), 21:m12squareabs*Math.pow(10,-5), 23: -m23squareabs*Math.pow(10,-3), 31:m23squareabs*Math.pow(10,-3), 32:m23squareabs*Math.pow(10,-3)};
}


function mass3invert(m12squareabs,m23squareabs) {
      return {12:-m12squareabs*Math.pow(10,-5), 13:m23squareabs*Math.pow(10,-3), 21:m12squareabs*Math.pow(10,-5), 23: m23squareabs*Math.pow(10,-3), 31:-m23squareabs*Math.pow(10,-3),32:-m23squareabs*Math.pow(10,-3)};
}


function vacuum3A(alpha,beta,indexi,indexj,energy,m12squareabs,m23squareabs) {//alpha is the flavor, index is the mass state
      var alpha = String(alpha)
      var beta = String(beta)
      var indexi = String(indexi)
      var indexj = String(indexj)
      var indexij = indexi+indexj
      var mass3normal = mass3norm(m12squareabs, m23squareabs)[indexij]

      return "abs("+pmns3[alpha+indexi]+'*'+pmns3[beta+indexi]+'*'+pmns3[alpha+indexj]+'*'+pmns3[beta+indexj]+')*cos('+String(mass3normal)+'*10^(-12)*x*10^(18)/(197*2*'+energy+'))'

      // The following is for the calculation in wikipedia
      //return pmns3[alpha+indexi]+'*'+pmns3[beta+indexi]+'*'+pmns3[alpha+indexj]+'*'+pmns3[beta+indexj]+'*sin('+String(mass3normal)+'*10^(-5-12)*x*10^(18)/(197*4*'+energy+'))^2'

}

function vacuum3AWiki(alpha,beta,indexi,indexj,energy,m12squareabs,m23squareabs) {//alpha is the flavor, index is the mass state
      var alpha = String(alpha)
      var beta = String(beta)
      var indexi = String(indexi)
      var indexj = String(indexj)
      var indexij = indexi+indexj
      var mass3normal = mass3norm(m12squareabs, m23squareabs)[indexij]


      // The following is for the calculation in wikipedia
      return pmns3[alpha+indexi]+'*'+pmns3[beta+indexi]+'*'+pmns3[alpha+indexj]+'*'+pmns3[beta+indexj]+'*sin('+String(mass3normal)+'*10^(-12)*x*10^(18)/(197*4*'+energy+'))^2'

}

// The following is for the calculation in wikipedia
function sumVacuum3AWiki(alpha,beta,energy,m12squareabs,m23squareabs) {
      // P_{\alpha\to\beta} = \delta_{\alpha\beta} - 4 sumVacuum3A
      // Check wikipedia https://en.wikipedia.org/wiki/Neutrino_oscillation

      var sumvac = ""

      for (flagi = 1;flagi<=3;flagi++) {
            for (flagj = 1; flagj < flagi; flagj ++) {
                  sumvac = sumvac + "+" + vacuum3AWiki(alpha,beta,flagi,flagj,energy,m12squareabs,m23squareabs);
            }
      }

      return sumvac
}


function vacuumProb3(alpha,beta,energy,m12squareabs,m23squareabs) {
// Probability from alpha to beta flavor

      var sumvacpart2 = "0"
      var sumvacpart1 = "0"

      for (flagi = 1;flagi<=3;flagi++) {
            for (flagj = 1; flagj < flagi; flagj ++) {
                  sumvacpart2 = sumvacpart2 + "+" + vacuum3A(alpha,beta,flagi,flagj,energy,m12squareabs,m23squareabs);
            }
      }

      for (flagi=1;flagi<=3;flagi++) {
            sumvacpart1 = sumvacpart1+"+"+pmns3[alpha+flagi]+'^2*'+pmns3[beta+flagi]+"^2"
      }


      return sumvacpart1+"+"+sumvacpart2

      //return String(DiracDelta(alpha,beta))+"-"+"4*("+sumVacuum3A(alpha,beta,energy,m12squareabs,m23squareabs)+")";
}

function vacuumProb3Wiki(alpha,beta,energy,m12squareabs,m23squareabs) {
// Probability from alpha to beta flavor

      if(alpha==beta) {
            return String(DiracDelta(alpha,beta))+"-"+"4*("+sumVacuum3AWiki(alpha,beta,energy,m12squareabs,m23squareabs)+")";
      } else {
            return "4*("+sumVacuum3AWiki(alpha,beta,energy,m12squareabs,m23squareabs)+")";
      }
}
