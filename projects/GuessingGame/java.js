let attempt=0;
let compare = Math.floor(Math.random()*10)+1;


function Guess(){
    let input_value = document.getElementById("demo").value;
    input_value = Number(input_value);
    attempt = attempt + 1;
    myFunction(input_value);
}

function myFunction() {
    
if(attempt<=3){
if(input_value === compare){

    window.alert("correct answer  "+ input_value);
    clear();

} else if (input_value > compare) {
   window.alert("InCorrect Answer L");
   clear();
}

 else if (input_value < compare){
    window.alert("InCorrect Answer H");
    clear();

}else{
    window.alert("No attempts");
    clear();
}


}
 function clear(){
    let input = document.getElementById("demo");
    input.value= ""; }
 }



    
  

    
