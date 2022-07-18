function validateUserInput(){
    var userinput = document.getElementById("useridtxt").value;
    var display = document.getElementById("displayOutputDiv").innerHTML;

    var correct = true;

    if(userinput != 13 || !userinput(userinput)){

      var tempDate = new Date(userinput.substring(0, 2), userinput.substring(2, 4) - 1, userinput.substring(4, 6));

    var day_b = tempDate.getDate();
    var month_b = tempDate.getMonth();
    var year_b = tempDate.getFullYear();
    
   
  }

    var fulldate = year_b + "/" + month_b + "/" + day_b;

    if(!(tempDate.getYear() == userinput.substring(0,2) && month_b == userinput.substring(2,4)-1 && day_b == userinput.substring(4,6))){ 
    
     correct = false;

  }

  var Gender = userinput.substring(6, 10);
  var getGender = parseInt(Gender) < 5000 ? "Female":"Male";

  var citizen = parseInt(userinput.substring(10, 11)) == 0 ? "Yes" : "No";

  var tempTotal = 0;
  var checkSum = 0;
  var multiplier = 1;

  for (var i = 0; i < 13; ++i) {
    tempTotal = parseInt(userinput.charAt(i)) * multiplier;
    if (tempTotal > 9) {
        tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
    }
    checkSum = checkSum + tempTotal;
    multiplier = (multiplier % 2 == 0) ? 1 : 2;
}
if ((checkSum % 10) != 0) {
    correct = false;
};

if (correct){

 display = 'South African ID Number:   ' + userinput + 'Birth Date:   ' + fullDate + 'Gender:  ' + getGender + '<SA Citizen:  ' + citizen ;

   
} else {

display="ID not a Validd";

}

}
