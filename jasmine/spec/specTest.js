


 var waistNum, neckNum, heightNum, hipNum, genderId, newEditBtn, addDataTable,formId, percentFat, Log10, bf;
 waistNum = 32;
 neckNum = 12;
 heightNum = 65;
 hipNum = 35;
 genderId= "Male";
 bf = 10;
 bfoutput= "Athletes";




 describe("bf range returns", function() {

     it("it returns correct", function() {
       var a = bf;
       var b = bfoutput;
         expect(bfRanges(a)).toEqual(b);
     });
 });



describe("findBf function works", function() {
 // var waistNum, neckNum, heightNum, hipNum;
 //  beforeEach(function(){
 //    waistNum = 32;
 //    neckNum = 12;
 //    heightNum = 65;
 //    hipNum = 35;
 //  });


    it("male bf test", function() {
        expect(findBf("Male")).toEqual("21.7");
    });
});

describe("find log function", function() {

    it("found Log10", function() {
      var a = percentFat;
        expect(findBf).toContain(Log10);
    });
});

describe("find console.log", function() {

    it("found it", function() {
        expect(findBf).toContain(console.log("text"));
    });
});

describe("find variable", function() {

    it("found the variable", function() {
      var a = percentFat;
        expect(findBf).toContain(a);
    });
});


describe("adding numbers", function() {

    it("neckNum divided by 12", function() {
      var a = neckNum;
      var b = 12;
        expect(a/b).toEqual(1);
    });
});

// describe("my canvas stuff", function(){
//   beforeEach(function(){
//     setFixtures("<canvas id='screen'></canvas>");
//   });
//
//   it("does stuff with the canvas", function(){
//     // … execute your code here, and it will find the #screen canvas element
//   });
// });
