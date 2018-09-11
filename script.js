

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
    var dateNum = document.getElementById("dateInputId").value;
    var weightNum = document.getElementById("weightInputId").value;


    // parsing values
    var neckNum = parseInt(neckNum);
    var hipNum = parseInt(hipNum);
    var heightNum = parseInt(heightNum);
    var waistNum = parseInt(waistNum);
    // var dateNum = parseInt(dateNum);
    var weightNum = parseInt(weightNum);

// checking
    console.log(dateNum);

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
  document.getElementById("displayBfRange").innerHTML = "21";
  document.getElementById("displayWeight").innerHTML = weightNum;
  document.getElementById("displayWeightRange").innerHTML = "20";



// add to table
var tableRef = document.getElementById('tableId').getElementsByTagName('tbody')[0];
// Insert a row in the table at the last row
var newRow   = tableRef.insertRow(tableRef.rows.length);

// Insert a cell in the row at index 0
var newDateRow  = newRow.insertCell(0);
var newWeightRow  = newRow.insertCell(1);
var newBfRow  = newRow.insertCell(2);
var newEditRow  = newRow.insertCell(3);
var newDeleteRow  = newRow.insertCell(4);

var dataDate = dateNum;
var dataWeight = weightNum;
var dataBf = calculatedStats.toPrecision(3);



// Append a text node to the cell
var newTextDate  = document.createTextNode(dataDate);
var newTextWeight  = document.createTextNode(dataWeight);
var newTextBf  = document.createTextNode(dataBf);
var newTextEdit  = document.createTextNode('edit');
var newTextDelete  = document.createTextNode('delete');


newDateRow.appendChild(newTextDate);
newWeightRow.appendChild(newTextWeight);
newBfRow.appendChild(newTextBf);
newEditRow.appendChild(newTextEdit);
newDeleteRow.appendChild(newTextDelete);






    return false
  }



}
