

window.onload = function(){
               // Just Make sure to return false so that your request will not go the server script

  var formId = document.getElementById("calcForm");
  // var obj = {};

  newEditBtn.addEventListener("click", function() {
    // var x = document.getElementById("tableId");
    var x = document.getElementById("tableId");
    if (x.contentEditable == "true") {
        x.contentEditable = "false";
        newEditBtn.innerHTML = "Edit";
    } else {
        x.contentEditable = "true";
        newEditBtn.innerHTML = "Save";
    }
  });

  formId.onsubmit = function(){


    // retrieving input data after submit
    var dateNum = document.getElementById("dateInputId").value;
    var ageNum = document.getElementById("ageInputId").valueAsNumber;

    var neckNum = document.getElementById("neckInputId").valueAsNumber;
    var hipNum = document.getElementById("hipsInputId").valueAsNumber;
    var waistNum = document.getElementById("waistInputId").valueAsNumber;

    var weightNum = document.getElementById("weightInputId").valueAsNumber;
    var feetNum = document.getElementById("feetInputId").valueAsNumber;
    var inchNum = document.getElementById("inchInputId").valueAsNumber;
    var male = document.getElementById("maleId").value;

    var female = document.getElementById("femaleId").value;
    var genderId =document.querySelector('input[name="gender"]:checked').value;
    // console.log(genderId);
    // console.log(typeof weightNum);
    // parsing values
    // var neckNum = parseInt(neckNum);
    // var hipNum = parseInt(hipNum);
    // var waistNum = parseInt(waistNum);
    // var weightNum = parseInt(weightNum);
    // console.log(weightNum);
    // var feetNum = parseInt(feetNum);
    // var inchNum = parseInt(inchNum);
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
          // console.log("female by is " + bf);
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
  document.getElementById("displayInput").innerHTML = bf + "%";

  // putting stats in side panel

  function displayBmiRange(bmi){
    if (bmi<18.5){
        return "Underweight";
    }  else if (bmi>=18.5 && bmi<=25){
        return "Normal"
    }  else if (bmi>=18.5 && bmi<=25){
        return "Overweight";
    }  else if (bmi>=18.5 && bmi<=25){
        return "Obese";
      };
    };
  var display = displayBmiRange(bmi);
  document.getElementById("displayBmiRange").innerHTML = display;



function idealBfPercentage(age, bf){
  if (genderId == "Male"){
    if (age<25){
        return 8.5;

    }  else if (age>=25 && age<=30){
      return 10.5;

    }  else if (age>=30 && age<=35){
      return 12.7;

    }  else if (age>=35 && age<=40){
      return 13.7;

      }  else if (age>=40 && age<=45){
        return 15.3;

        }  else if (age>=45 && age<=50){
          return 16.4;

          }  else if (age>=50 && age<=55){
            return 18.9;

        }  else if (age>55){
          return 10.5

      };
}  else {
  if (age<25){
    return 17.7;

  }  else if (age>=25 && age<=30){
    return 18.4;

  }  else if (age>=30 && age<=35){
    return 19.3;

  }  else if (age>=35 && age<=40){
    return 21.5;

    }  else if (age>=40 && age<=45){
      return 22.2;

      }  else if (age>=45 && age<=50){
        return 22.9;

        }  else if (age>=50 && age<=55){
          return 25.2;

      }  else if (age>55){
        return 26.3;

    };
  };
};

  var idealPercent = idealBfPercentage(ageNum, bf);
  console.log(idealPercent);
  var diffPercent = (bf - idealPercent);
  console.log(diffPercent);
  var toLose = (diffPercent / 100) * weightNum;
  toLose = parseInt(toLose);
  console.log(toLose);
  document.getElementById("displayIdealPercent").innerHTML = idealPercent + "%";
  document.getElementById("displayToLose").innerHTML = toLose +" lbs";





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


  var bfToPercent = (bf / 100);
  // console.log(bfToPercent);
  var fatMassNum = ( weightNum * bfToPercent);
  // console.log(fatMassNum);
  fatMassNum = parseInt(fatMassNum);

  var LeanMassNum = (weightNum - fatMassNum);

  LeanMassNum = parseInt(LeanMassNum);
  // console.log(LeanMassNum);

  document.getElementById("displayLeanMass").innerHTML = LeanMassNum + " lbs";
  document.getElementById("displayFatMass").innerHTML = fatMassNum +" lbs";



  // document.getElementById("displayBmiRange").innerHTML = display;




  // add to table
  var tableRef = document.getElementById('tableId').getElementsByTagName('tbody')[0];
  // Insert a row in the table at the last row
  var newRow   = tableRef.insertRow(tableRef.rows.length);

  // Insert a cell in the row at index 0
  var newDateRow  = newRow.insertCell(0);
  var newWeightRow  = newRow.insertCell(1);
  var newBfRow  = newRow.insertCell(2);
  var newNeckRow  = newRow.insertCell(3);
  var newWaistRow  = newRow.insertCell(4);
  var newHipsRow = newRow.insertCell(5);
  var newDeleteRow  = newRow.insertCell(6);

// Append a text node to the cell



  var newDelBtn = document.createElement("BUTTON");
  newDelBtn.addEventListener("click", function() {
  document.getElementById('tableId').deleteRow(this.parentNode.parentNode.rowIndex)

  });
  var newDelete = document.createTextNode("Delete");
  newDelBtn.appendChild(newDelete);
  document.body.appendChild(newDelBtn);


  newDateRow.appendChild(document.createTextNode(dateNum));
  newWeightRow.appendChild(document.createTextNode(weightNum));
  newBfRow.appendChild(document.createTextNode(bf));
  newNeckRow.appendChild(document.createTextNode(neckNum));
  newWaistRow.appendChild(document.createTextNode(waistNum));
  newHipsRow.appendChild(document.createTextNode(hipNum));

  newDeleteRow.appendChild(newDelBtn);




    return false
  }




};
