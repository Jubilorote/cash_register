function checkCashRegister(price, cash, cid) {
  let status=0;
  let rest=0;
  let change=0;
  rest=cash-price;
   let coinsValue=[
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100],
  ];
  ///console.log(rendue(coinsValue, rest, cid));
  ////////////////
  if (total(cid)< rest || rendue(coinsValue, rest, cid)==""){ // Si le total cid < change
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }
  ////////////////
  if(total(cid)>rest){
    console.log(rendue(coinsValue, rest, cid));
    return{status: "OPEN", change: rendue(coinsValue, rest, cid)}
    }
  ///////////////
  if(total(cid) == rest){
    //console.log(rendue(coinsValue, rest, cid));
    return {status: "CLOSED", change: rendue(coinsValue, rest, cid)};
  }
  //////////////
  function total(ep){ // calcul le total de cid
    let result=0
    for(let mi in ep){
    result += ep[mi][1]
  }
  return result;
  }
  ///////////////
  function arrondir(nombre){
    let arrondi=0;
    arrondi = nombre*100;          // 556.845
    arrondi = Math.round(arrondi); // 556
    return arrondi/100;         // 5.56
  }

  function rendue(coinsValue, rest, cid){ //calcul le rendue
    let changeCoins=[]
    let quotient=0;
    let tot=0;
    let tampon=[];
    let firstRest=0;
    firstRest=rest;
      for (let mi=8; mi >= 0; mi--){
        rest = arrondir(rest);
        if((rest >= coinsValue[mi][1]) && (cid[mi][1]!=0)){ // Si le reste est au dessus d'un billet
            quotient = Math.floor(rest/coinsValue[mi][1]); // on calcul la division entiere entre le reste & billet
            tot= quotient*coinsValue[mi][1]; //on obtient le total donné
            
              if(tot > cid[mi][1]){ //si le total est > au billet totaux
                for(let i=0; tot>cid[mi][1]; i++){
                    quotient--;
                    tot=quotient*coinsValue[mi][1];
                    rest-=tot;
                    rest=arrondir(rest);
                }
              }
              if(tot < cid[mi][1]){ //si le total est < au billet totaux
              rest %= coinsValue[mi][1];} //on calcul le reste
            if(tot===rest){
              rest=0;
            }
            rest=arrondir(rest);
            tampon.push(coinsValue[mi][0]); // formalité
            tampon.push(tot);
            //console.log(rest);
            //console.log(tampon)
            changeCoins.push(tampon);
           // console.log(changeCoins);
           // console.log(rest);
            tampon=[];
        }
      }
      if(arrondir(rest) == 0){
        if(total(cid)=== firstRest){
          return cid;
        }
        return changeCoins;
      }else{return ""}
  }
  ////////////
}
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
