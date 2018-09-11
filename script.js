

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
    // var heightNum = document.getElementById("heightInputId").value;
    var waistNum = document.getElementById("waistInputId").value;
    var dateNum = document.getElementById("dateInputId").value;
    var weightNum = document.getElementById("weightInputId").value;
    var feetNum = document.getElementById("feetInputId").value;
    var inchNum = document.getElementById("inchInputId").value;
    var male = document.getElementById("maleId").value;
    var female = document.getElementById("femaleId").value;
    var genderId =document.querySelector('input[name="gender"]:checked').value;
    console.log(genderId);



    // parsing values
    var neckNum = parseInt(neckNum);
    var hipNum = parseInt(hipNum);
    // var heightNum = parseInt(heightNum);
    var waistNum = parseInt(waistNum);
    // var dateNum = parseInt(dateNum);
    var weightNum = parseInt(weightNum);



    var feetNum = parseInt(feetNum);
    var inchNum = parseInt(inchNum);
    var feetToInch = (feetNum * 12);
    var feetPlusInch = (feetToInch + inchNum);
    // console.log(feetPlusInch);
// checking
    // console.log(dateNum);

  function Log10(X){
     return( Math.log(X) / Math.log(10) );
  };

  function calculate(neck, hip, height, waist){
    var percentFat = (163.205 * Log10(((waist + hip) - neck)) - 97.684 * Log10(height) - 78.387);

    return percentFat
  }


  function calculateBfMale(neck, height, waist){
    var percentFat = ((86.010 * (Log10(waist - neck))) - (70.041 * (Log10(height))) + 36.76);

    return percentFat
  };




  if (genderId == "Male"){
    var MaleBf= calculateBfMale(neckNum, feetPlusInch, waistNum);
    var bfm = MaleBf.toPrecision(3);
    console.log("male by is " + bfm);
  }  else {
    var calculatedStats = calculate(neckNum, hipNum, feetPlusInch, waistNum);
  
    var bf =calculatedStats.toPrecision(3);
    console.log(bf);
  };






  // function calculateBfMale(neck, height, waist){
  //   var percentFat = ((86.010 * (Log10(waist - neck))) - (70.041 * (Log10(height))) + 36.76);
  //
  //   return percentFat
  // };
  //
  // var MaleBf= calculateBfMale(neckNum, feetPlusInch, waistNum);
  // var bfm = MaleBf.toPrecision(3);
  // console.log("male by is " + bfm);



  weightBmi = (weightNum);
  heightBmi = (feetPlusInch*feetPlusInch);
  // heightBmi = (heightNum*heightNum);


  var bmi = ((weightBmi / heightBmi) * 703);
  // var BMI=weightBmi/Math.pow(heightBmi,2);
  var bmi = bmi.toPrecision(3);
  // console.log(bmi);



  var calculatedStats = calculate(neckNum, hipNum, feetPlusInch, waistNum);
  // var calculatedStats = calculate(neckNum, hipNum, heightNum, waistNum);
  // console.log(calculatedStats);

  var bf =calculatedStats.toPrecision(3);
  console.log(bf);




  // putting stats in side panel

  document.getElementById("displayInput").innerHTML = bf;
  // document.getElementById("displayBfRange").innerHTML = "20";
  document.getElementById("displayBmi").innerHTML = bmi;
  // document.getElementById("displayBmiRange").innerHTML = "20";

  if (bmi<18.5)
      document.getElementById("displayBmiRange").innerText = "Underweight";
    else   if (bmi>=18.5 && bmi<=25)
      document.getElementById("displayBmiRange").innerText = "Normal";
   else   if (bmi>=25 && bmi<=30)
      document.getElementById("displayBmiRange").innerText = "Obese";
   else   if (bmi>30)
      document.getElementById("displayBmiRange").innerText = "Overweight";

// womens body fat
    if (bf<10)
          document.getElementById("displayBfRange").innerText = "Underfat";
      else   if (bf>=10 && bf<=13)
            document.getElementById("displayBfRange").innerText = "Essential Fat";
      else   if (bf>=13 && bf<=20)
          document.getElementById("displayBfRange").innerText = "Athletes";
      else   if (bf>=20 && bf<=25)
          document.getElementById("displayBfRange").innerText = "Fitness";
      else   if (bf>=25 && bf<=32)
              document.getElementById("displayBfRange").innerText = "Average";
      else   if (bf>32)
          document.getElementById("displayBfRange").innerText = "Obese";




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
