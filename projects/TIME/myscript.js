function Currenttime(){

    let date = new Date();
    let hrs = date.getHours();
    let mnts = date.getMinutes();
    let scds = date.getSeconds();
    let session = "Am";

    if(hrs == 0){
        hrs = 12;
    }

    else if(hrs > 12){
        hrs = hrs-12;
        session = "Pm";
    }

    hrs = (hrs < 10) ? "0" + hrs : hrs;
    mnts = (mnts < 10) ? "0" + mnts : mnts;
    scds = (scds < 10) ? "0" + scds : scds;
    
    let time = hrs + ":" + mnts + "+" + scds + " " + session;

    document.getElementById("clock").innerText = time;
    let t = setTimeout(function(){ Currenttime()}, 1000)
}
Currenttime();
