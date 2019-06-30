window.addEventListener('load',
  function() {
    allCode();
  }, false);


var now = new Date();
var month = now.getMonth();
month = month+1;
var day = now.getDate();
if ((month.toString().length) === 1) {
  month = `0${month}`
}
// if (day.toString().length) === 1) {
//   day= `0${day}`
// }
var nowDate = ( `${now.getFullYear()}-${month}-${day}`);



var canvas = document.getElementById("myChart");
var ctx = canvas.getContext('2d');
var chartType = 'line';
var myChart;
// Global Options:
Chart.defaults.global.defaultFontColor = 'grey';
Chart.defaults.global.defaultFontSize = 14;
var data = {
  labels: ['Jan 2019', 'Feb', 'Mar', 'Apr', 'May  2019', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec 2019'],
  datasets: [{
    label: "Weight",
    fill: false,
    lineTension: 0.1,
    backgroundColor: "#286090",
    borderColor: "#286090", // The main line color
    pointBackgroundColor: "#286090",
    pointHitRadius: 10,
    data: [120, 130, 125, 127],
    spanGaps: true,
  }]
};
var options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: false,
      }
    }]
  }
};

function addDataTable(monthsLabel, numberData) {
  myChart.data.datasets[0].data[monthsLabel] = numberData;
  myChart.update();
};

function newChartBtn() {
  var getTable = (document.getElementById("tableId"));
  for (var i = 0, row; row = getTable.rows[i]; i++) {
   //iterate through rows
   var tableWeight = (getTable.rows[i].cells[1].innerHTML);
   var tableDateNew = new Date(getTable.rows[i].cells[0].innerHTML);

   var month = (tableDateNew.getMonth())+1;
   var year = tableDateNew.getFullYear();
   // month = month+1;
   var day = now.getDate();
   if ((month.toString().length) === 1) {
     month = `0${month}`
   }
   var monthsNumberForChart = (month - 1);
   addDataTable(monthsNumberForChart, tableWeight);
    }
};

function init() {
  // Chart declaration:
  myChart = new Chart(ctx, {
    type: chartType,
    data: data,
    options: options
  });
}



function allCode() {
  // return false so that your request will not go the server script
  init();
  var formId = document.getElementById("calcForm");

  exampleButton.addEventListener("click", function() {
    document.getElementById("dateInputId").value = `${nowDate}`;
    document.getElementById("ageInputId").value = "26";
    document.getElementById("neckInputId").value = "12";
    document.getElementById("hipsInputId").value = "35";
    document.getElementById("waistInputId").value = "32";
    document.getElementById("weightInputId").value = "150";
    document.getElementById("feetInputId").value = "5";
    document.getElementById("inchInputId").value = "5";
  });



  formId.onsubmit = function() {
    // retrieving input data after submit
    var dateNum = document.getElementById("dateInputId").value;
    var ageNum = document.getElementById("ageInputId").valueAsNumber;
    var neckNum = document.getElementById("neckInputId").valueAsNumber;
    var hipNum = document.getElementById("hipsInputId").valueAsNumber;
    var waistNum = document.getElementById("waistInputId").valueAsNumber;
    var weightNum = document.getElementById("weightInputId").valueAsNumber;
    var feetNum = document.getElementById("feetInputId").valueAsNumber;
    var inchNum = document.getElementById("inchInputId").valueAsNumber;
    var genderId = document.querySelector('input[name="gender"]:checked').value;
    var activityNum = document.querySelector('input[name="activity"]:checked').value;
    var activityNumber = parseFloat(activityNum);
    var heightNum = ((feetNum * 12) + inchNum);



    //find body fat percentage by gender
    function findBf(genderId) {
      const Log10 = X => (Math.log(X) / Math.log(10));

      if (genderId == "Male") {
        var percentFat = ((86.010 * (Log10(waistNum - neckNum))) - (70.041 * (Log10(heightNum))) + 36.76).toPrecision(3);
        return percentFat
      } else {
        var percentFat = (163.205 * Log10(((waistNum + hipNum) - neckNum)) - 97.684 * Log10(heightNum) - 78.387).toPrecision(3);
        return percentFat
      };
    };
    var bf = findBf(genderId);



    //calculate body mass index from inputs
    var bmi = ((weightNum / (heightNum * heightNum)) * 703).toPrecision(3);
    document.getElementById("displayBmi").innerHTML = bmi;
    document.getElementById("displayInput").innerHTML = `${bf}%`;

    // find and put bmi range in side panel
    function displayBmiRange(bmi) {
      return (bmi < 18.5)              ? "Underweight"
            :(bmi >= 18.5 && bmi < 25) ? "Normal"
            :(bmi >= 25 && bmi < 30)   ? "Overweight"
            :                            "Obese";
    };
    document.getElementById("displayBmiRange").innerHTML = displayBmiRange(bmi);


    // Bodyfat percentage ranges
    function bfRanges(bf) {
      const between = (bf, min, max) => bf >= min && bf <= max;

       if (genderId == "Male") {
         return (bf < 3) ?            "Underfat"
              : between(bf, 3, 5)   ? "Essential Fat"
              : between(bf, 5, 13)  ? "Athletes"
              : between(bf, 13, 17) ? "Fitness"
              : between(bf, 17, 24) ? "Average"
              :                       "Obese";
       }  else {
         return (bf < 10) ?           "Underfat"
              : between(bf, 10, 13) ? "Essential Fat"
              : between(bf, 13, 20) ? "Athletes"
              : between(bf, 20, 25) ? "Fitness"
              : between(bf, 25, 32) ? "Average"
              :                       "Obese";
          };
    };


    //display bf range
    document.getElementById("displayBfRange").innerText = bfRanges(bf);
    // calculate lean mass and fat mass
    var fatMassNum = parseInt(weightNum * (bf / 100));
    var LeanMassNum = parseInt(weightNum - fatMassNum);
    document.getElementById("displayLeanMass").innerHTML = `Fat  ${LeanMassNum} lbs`;
    document.getElementById("displayFatMass").innerHTML = `Fat  ${fatMassNum} lbs`;


    //find tdee from gender, Basal Metabolic rate(bmr) and activity level
    function findTdee(genderId, activityNumber) {
      if (genderId == "Male") {
        var bmr = 66 + (6.23 * weightNum) + (12.7 * heightNum) - (6.8 * ageNum).toPrecision(4);
        var tdee = (bmr * activityNumber);
        return tdee
      } else {
        var bmr = 655 + (4.35 * weightNum) + (4.7 * heightNum) - (4.7 * ageNum).toPrecision(4);
        var tdee = (bmr * activityNumber);
        return tdee
      };
    };
    var tdee = (findTdee(genderId, activityNumber).toPrecision(4));
    document.getElementById("displayTdee").innerHTML = `${tdee} calories`;



    function insert_Row() {
      var xTable = document.getElementById('tableId');
      var tbody = xTable.getElementsByTagName('tbody')[0];
      var newRow = tbody.insertRow(0);

      newRow.innerHTML = (`<td>${dateNum}</td><td>${weightNum}</td><td>${bf}</td><td>${neckNum}</td><td>${waistNum}</td><td>${hipNum}</td>`);

      var tdDelete = document.createElement('td');
      var theDeleteBtn = document.createElement("i");
      theDeleteBtn.setAttribute("class", "far fa-trash-alt");
      theDeleteBtn.addEventListener("click", function() {
        xTable.deleteRow(this.parentNode.parentNode.rowIndex)
      });
      tdDelete.appendChild(theDeleteBtn)
      newRow.appendChild(tdDelete)
    }


    insert_Row()
    newChartBtn();

    return false

  }

};
