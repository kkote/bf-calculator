
 var waistNum, neckNum, heightNum, hipNum;
 waistNum = 32;
 neckNum = 12;
 heightNum = 65;
 hipNum = 35;

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
