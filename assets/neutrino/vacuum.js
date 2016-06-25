// PMNS Matrix
// The Matrix that mix mass eigenstates into flavor eigenstates
// pmns3 is define to be an object
// pmns3 is a real matrix, which is grabbed from wikipedia https://en.wikipedia.org/wiki/Pontecorvo%E2%80%93Maki%E2%80%93Nakagawa%E2%80%93Sakata_matrix

pmns3={e1:0.82, e2:0.54, e3:0.15,
      m1:0.35, m2:0.70, m3:0.62,
      t1:0.44, t2:0.45, t3:0.77};

function mass3norm(m12squareabs,m23squareabs) {
      return {12:-m12squareabs, 13:-m23squareabs, 21:m12squareabs, 23: -m23squareabs, 31:m23squareabs,32:m23squareabs};
}

function mass3invert(m12squareabs,m23squareabs) {
      return {12:-m12squareabs, 13:m23squareabs, 21:m12squareabs, 23: m23squareabs, 31:-m23squareabs,32:-m23squareabs};
}


function vacuum3A(alpha,beta,indexi,indexj,energy,m12squareabs,m23squareabs) {//alpha is the flavor, index is the mass state
      var alpha = String(alpha)
      var beta = String(alpha)
      var indexi = String(indexi)
      var indexj = String(indexj)
      var indexij = indexi+indexj
      var mass3normal = mass3norm(m12squareabs, m23squareabs)[indexij]

      return pmns3[alpha+indexi]+'*'+pmns3[beta+indexi]+'*'+pmns3[alpha+indexj]+'*'+pmns3[beta+indexj]+'*sin('+String(mass3normal)+'*10^(-5-12)*x*10^(18)/(197*4*'+energy+'))^2'
      //return pmns3[alpha+indexi]+'*'+pmns3[beta+indexi]+'*'+pmns3[alpha+indexj]+'*'+pmns3[beta+indexj]+'*sin(10^(-5-12)*x*10^(18)/(197*4*'+energy+'))^2'
}
