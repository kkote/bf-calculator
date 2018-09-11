

window.onload = function(){
               // Just Make sure to return false so that your request will not go the server script

  var formId = document.getElementById("calcForm");
  var obj = {};



  formId.onsubmit = function(){

    function Log10(X){
       return( Math.log(X) / Math.log(10) );
    };
    // retrieving input data after submit
    // debugger;
    var neckNum = document.getElementById("neckInputId").value;
    var hipNum = document.getElementById("hipsInputId").value;
    var heightNum = document.getElementById("heightInputId").value;
    var waistNum = document.getElementById("waistInputId").value;

    // parsing values
    var neckNum = parseInt(neckNum);
    var hipNum = parseInt(hipNum);
    var heightNum = parseInt(heightNum);
    var waistNum = parseInt(waistNum);

// checking
    console.log(neckNum);

  function Log10(X){
     return( Math.log(X) / Math.log(10) );
  };

  function calculate(neck, hip, height, waist){
    var percentFat = (163.205 * Log10(((waist + hip) - neck)) - 97.684 * Log10(height) - 78.387);

    return percentFat
  }



var calculatedStats = calculate(neckNum, hipNum, heightNum, waistNum);
console.log(calculatedStats);


// putting total in div
document.getElementById("displayInput").innerHTML = calculatedStats.toPrecision(3);




    return false
  }



}
