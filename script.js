

window.onload = function(){
               // Just Make sure to return false so that your request will not go the server script

  var formId = document.getElementById("calcForm");
  // var obj = {};



  formId.onsubmit = function(){


    // retrieving input data after submit
    var neckNum = document.getElementById("neckInputId").value;
    var hipNum = document.getElementById("hipsInputId").value;
    var waistNum = document.getElementById("waistInputId").value;
    var dateNum = document.getElementById("dateInputId").value;
    var weightNum = document.getElementById("weightInputId").value;
    var feetNum = document.getElementById("feetInputId").value;
    var inchNum = document.getElementById("inchInputId").value;
    var male = document.getElementById("maleId").value;

    var female = document.getElementById("femaleId").value;
    var genderId =document.querySelector('input[name="gender"]:checked').value;
    // console.log(genderId);

    // parsing values
    var neckNum = parseInt(neckNum);
    var hipNum = parseInt(hipNum);
    var waistNum = parseInt(waistNum);
    var weightNum = parseInt(weightNum);

    var feetNum = parseInt(feetNum);
    var inchNum = parseInt(inchNum);
    var heightNum = ((feetNum * 12)+ inchNum);


    function findBf(genderId){
      function Log10(X){
         return( Math.log(X) / Math.log(10) );
      };
      if (genderId == "Male"){
          var percentFat = ((86.010 * (Log10(waistNum - neckNum))) - (70.041 * (Log10(heightNum))) + 36.76);
          var bf = percentFat.toPrecision(3);
          console.log("male by is " + bf);
          return bf
      }  else {
          var percentFat = (163.205 * Log10(((waistNum + hipNum) - neckNum)) - 97.684 * Log10(heightNum) - 78.387);
          var bf = percentFat.toPrecision(3);
          console.log("female by is " + bf);
          return bf
        };
      };
    var bf = findBf(genderId);
    console.log(bf);

    // var bf = findBmi(genderId);
    // console.log(bf);

  var bmi = ((weightNum / (heightNum*heightNum)) * 703);
  var bmi = bmi.toPrecision(3);
  document.getElementById("displayBmi").innerHTML = bmi;
  document.getElementById("displayInput").innerHTML = bf;

  // putting stats in side panel

  function displayBmiRange(bmi){
    if (bmi<18.5){
        return "Underweight";
    }  else if (bmi>=18.5 && bmi<=25){
        return "Normal"
    }  else if (bmi>=18.5 && bmi<=25){
        return "Overwieght";
    }  else if (bmi>=18.5 && bmi<=25){
        return "Obese";
      };
    };
  var display = displayBmiRange(bmi);
  document.getElementById("displayBmiRange").innerHTML = display;


  // Bodyfat percentage ranges
  function bfRanges(bf){
    if (genderId == "Male"){
      if (bf<18.5){
          return "Underfat";
      }  else if (bf>=3 && bf<=5){
          return "Essential Fat"
      }  else if (bf>=5 && bf<=13){
          return "Athletes";
      }  else if (bf>=13 && bf<=17){
          return "Fitness";
        }  else if (bf>=17 && bf<=24){
            return "Average";
          }  else if (bf>24){
              return "Obese";
        };
  }  else {
    if (bf<10){
        return "Underfat";
    }  else if (bf>=10 && bf<=13){
        return "Essential Fat"
    }  else if (bf>=13 && bf<=20){
        return "Athletes";
    }  else if (bf>=20 && bf<=25){
        return "Fitness";
      }  else if (bf>=25 && bf<=32){
          return "Average";
        }  else if (bf>32){
            return "Obese";
      };
  };
  };
  var bfRangeOutput = bfRanges(bf);
  document.getElementById("displayBfRange").innerText = bfRangeOutput;




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
  var dataBf = bf;
  // var dataBf = calculatedStats.toPrecision(3);



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




};
