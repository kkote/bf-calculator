window.onload = function () {
	// Just Make sure to return false so that your request will not go the server script

	var canvas = document.getElementById( "myChart" );
	var ctx = canvas.getContext( '2d' );
	var chartType = 'line';
	var myChart;

	// Global Options:
	Chart.defaults.global.defaultFontColor = 'grey';
	Chart.defaults.global.defaultFontSize = 16;

	var data = {
		labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ],
		datasets: [ {
			label: "Weight",
			fill: false,
			lineTension: 0.1,
			backgroundColor: "rgba(0,255,0,0.4)",
			borderColor: "green", // The main line color
			pointBackgroundColor: "green",
			pointHitRadius: 10,
			data: [ 120, 130, 140, 135, 145, 135, 140 ],
			spanGaps: true,
		} ]
	};

	var options = {
		scales: {
			yAxes: [ {
				ticks: {
					beginAtZero: false
				}
			} ]
		}
	};


	// var options = {
	//   scales: {
	//     yAxes: [{
	//       ticks: {
	//         beginAtZero: false
	//       }
	//     }]
	//
	//   },
	//   scales: xAxes: [{
	//       type: 'time',
	//       distribution: 'linear',
	//       time: {
	//           displayFormats: {
	//               quarter: 'MMM YYYY' sep 2015
	//               quarter: 'MMM D' sep 4
	//           }
	//       }
	//   }]
	//
	// };


	init();

	function init() {
		// Chart declaration:
		myChart = new Chart( ctx, {
			type: chartType,
			data: data,
			options: options
		} );
	}

	// addData();
	// // adjustNov();

	newChartBtn.addEventListener( "click", function () {
		var getTable =
			( document.getElementById( "tableId" ) );

		var tableRow = 1;
		var monthCell = 0;
		var weightCell = 1;

		var tableWeight = ( getTable.rows[ tableRow ].cells[ weightCell ].innerHTML );
		var tableDate = ( getTable.rows[ tableRow ].cells[ monthCell ].innerHTML );
		console.log( tableDate );
		console.log( tableWeight );
		// var monthDayFormat = moment(tableDate).format("MMM D");
		var monthFormat = moment( tableDate ).format( "MM" );
		// var weightForChartData = 180;
		var monthsNumberForChart = ( monthFormat - 1 );
		var weightForChartData = tableWeight;

		addDataTable( monthsNumberForChart, weightForChartData );

	} );

	//TODO most recent table entry, then graph whole table(update)

	function addDataTable( monthsLabel, numberData ) {
		myChart.data.datasets[ 0 ].data[ monthsLabel ] = numberData;
		myChart.update();
	};


	var formId = document.getElementById( "calcForm" );

	// edit button for table
	newEditBtn.addEventListener( "click", function () {
		var x = document.getElementById( "tableId" );
		if ( x.contentEditable == "true" ) {
			x.contentEditable = "false";
			newEditBtn.innerHTML = "Edit";
		} else {
			x.contentEditable = "true";
			newEditBtn.innerHTML = "Save";
		}
	} );

	formId.onsubmit = function () {

		// retrieving input data after submit
		var dateNum = document.getElementById( "dateInputId" ).value;
		var ageNum = document.getElementById( "ageInputId" ).valueAsNumber;
		var neckNum = document.getElementById( "neckInputId" ).valueAsNumber;
		var hipNum = document.getElementById( "hipsInputId" ).valueAsNumber;
		var waistNum = document.getElementById( "waistInputId" ).valueAsNumber;
		var weightNum = document.getElementById( "weightInputId" ).valueAsNumber;
		var feetNum = document.getElementById( "feetInputId" ).valueAsNumber;
		var inchNum = document.getElementById( "inchInputId" ).valueAsNumber;
		var genderId = document.querySelector( 'input[name="gender"]:checked' ).value;

		var activityNum = document.querySelector( 'input[name="activity"]:checked' ).value;
		console.log( activityNum );
		var activityNumber = parseFloat( activityNum );



		var heightNum = ( ( feetNum * 12 ) + inchNum );

		//find body fat percentage by gender
		function findBf( genderId ) {
			function Log10( X ) {
				return ( Math.log( X ) / Math.log( 10 ) );
			};
			if ( genderId == "Male" ) {
				var percentFat = ( ( 86.010 * ( Log10( waistNum - neckNum ) ) ) - ( 70.041 * ( Log10( heightNum ) ) ) + 36.76 );
				var bf = percentFat.toPrecision( 3 );
				// console.log("male by is " + bf);
				return bf
			} else {
				var percentFat = ( 163.205 * Log10( ( ( waistNum + hipNum ) - neckNum ) ) - 97.684 * Log10( heightNum ) - 78.387 );
				var bf = percentFat.toPrecision( 3 );
				// console.log("female by is " + bf);
				return bf
			};
		};
		var bf = findBf( genderId );
		// console.log(bf);
		//calculate bmi
		var bmi = ( ( weightNum / ( heightNum * heightNum ) ) * 703 );
		var bmi = bmi.toPrecision( 3 );
		document.getElementById( "displayBmi" ).innerHTML = bmi;
		document.getElementById( "displayInput" ).innerHTML = bf + "%";

		// putting bmi stats in side panel
		function displayBmiRange( bmi ) {
			if ( bmi < 18.5 ) {
				return "Underweight";
			} else if ( bmi >= 18.5 && bmi <= 25 ) {
				return "Normal"
			} else if ( bmi >= 18.5 && bmi <= 25 ) {
				return "Overweight";
			} else if ( bmi >= 18.5 && bmi <= 25 ) {
				return "Obese";
			};
		};
		var display = displayBmiRange( bmi );
		document.getElementById( "displayBmiRange" ).innerHTML = display;


		// Bodyfat percentage ranges
		function bfRanges( bf ) {
			if ( genderId == "Male" ) {
				if ( bf < 3 ) {
					return "Underfat";
				} else if ( bf >= 3 && bf <= 5 ) {
					return "Essential Fat"
				} else if ( bf >= 5 && bf <= 13 ) {
					return "Athletes";
				} else if ( bf >= 13 && bf <= 17 ) {
					return "Fitness";
				} else if ( bf >= 17 && bf <= 24 ) {
					return "Average";
				} else if ( bf > 24 ) {
					return "Obese";
				};
			} else {
				if ( bf < 10 ) {
					return "Underfat";
				} else if ( bf >= 10 && bf <= 13 ) {
					return "Essential Fat"
				} else if ( bf >= 13 && bf <= 20 ) {
					return "Athletes";
				} else if ( bf >= 20 && bf <= 25 ) {
					return "Fitness";
				} else if ( bf >= 25 && bf <= 32 ) {
					return "Average";
				} else if ( bf > 32 ) {
					return "Obese";
				};
			};
		};

		//display bf range
		var bfRangeOutput = bfRanges( bf );
		document.getElementById( "displayBfRange" ).innerText = bfRangeOutput;
		var bfToPercent = ( bf / 100 );
		// calculate lean mass and fat mass
		var fatMassNum = ( weightNum * bfToPercent );
		fatMassNum = parseInt( fatMassNum );
		var LeanMassNum = ( weightNum - fatMassNum );
		LeanMassNum = parseInt( LeanMassNum );
		document.getElementById( "displayLeanMass" ).innerHTML = LeanMassNum + " lbs";
		document.getElementById( "displayFatMass" ).innerHTML = fatMassNum + " lbs";


		//find tdee from gender and activity level
		function findTdee( genderId, activityNumber ) {
			if ( genderId == "Male" ) {
				var bmr = 66 + ( 6.23 * weightNum ) + ( 12.7 * heightNum ) - ( 6.8 * ageNum );
				var bmrNum = bmr.toPrecision( 4 );
				console.log( "bmr by is " + bmrNum );
				console.log( "acitity in function " + activityNumber )
				var tdee = ( bmrNum * activityNumber );
				console.log( "tdee is " + tdee );
				return tdee
			} else {
				var bmr = 655 + ( 4.35 * weightNum ) + ( 4.7 * heightNum ) - ( 4.7 * ageNum );
				var bmrNum = bmr.toPrecision( 4 );
				var tdee = ( bmrNum * activityNumber );
				console.log( "female by is " + bmrNum );
				return tdee
			};
		};

		var tdee = findTdee( genderId, activityNumber );
		var tdee = tdee.toPrecision( 4 );
		console.log( "tdee from function " + tdee );
		document.getElementById( "displayTdee" ).innerHTML = tdee + " calories";



		// add to table
		var tableRef = document.getElementById( 'tableId' ).getElementsByTagName( 'tbody' )[ 0 ];
		// Insert a row in the table at the last row
		// var newRow   = tableRef.insertRow(tableRef.rows.length);
		var newRow = tableRef.insertRow( 0 );
		// Insert a cell in the row at index 0
		var newDateRow = newRow.insertCell( 0 );
		var newWeightRow = newRow.insertCell( 1 );
		var newBfRow = newRow.insertCell( 2 );
		var newNeckRow = newRow.insertCell( 3 );
		var newWaistRow = newRow.insertCell( 4 );
		var newHipsRow = newRow.insertCell( 5 );
		var newDeleteRow = newRow.insertCell( 6 );

		//delete button
		var newDelBtn = document.createElement( "i" );
		newDelBtn.setAttribute( "class", "far fa-trash-alt" );
		newDelBtn.addEventListener( "click", function () {
			document.getElementById( 'tableId' ).deleteRow( this.parentNode.parentNode.rowIndex )
		} );
		// var newDelete = document.createElement("i");
		// newDelete.setAttribute("class", "far fa-trash-alt");
		// newDelBtn.appendChild(newDelete);
		document.body.appendChild( newDelBtn );


		// Append a text node to the cell
		newDateRow.append( document.createTextNode( dateNum ) );
		newWeightRow.append( document.createTextNode( weightNum ) );
		newBfRow.appendChild( document.createTextNode( bf ) );
		newNeckRow.appendChild( document.createTextNode( neckNum ) );
		newWaistRow.appendChild( document.createTextNode( waistNum ) );
		newHipsRow.appendChild( document.createTextNode( hipNum ) );
		newDeleteRow.appendChild( newDelBtn );


		return false
	}




};