var ctx;
var cwidth;
var cheight;
var ta;
var kamiw = 4;
var kamih = 4;
var i2p = 72;
var dashlen = 8;
var dgap = 2.0;
var ddahslen = 6.0;
var ddot = 2.0;
var dratio = dashlen/(dashlen+dgap);
var ddtotal = ddahslen+3*ddot;
var ddratio1 = ddahslen/ddtotal;
var ddratio2 = (ddahslen+ddot)/ddtotal;
var ddratio3 = (ddahslen+2*ddot)/ddtotal;

var kamix = 10;
var kamiy = 10;

var nextstep;

function dist(x1,y1,x2,y2){

    var x = x2-x1;
    var y = y2-y1;

    return Math.sqrt(x*x+y*y);
}

function intersect(x1,y1,x2,y2,x3,y3,x4,y4) {

    var m12 = (y2-y1)/(x2-x1);
    var m34 = (y4-y3)/(x4-x3); 
    var m = m34/m12; 
    var x = (x1-y1/m12-m*x3+y3/m12)/(1- m);
    var y = m12*(x-x1)+y1;
    return ([x,y]);
}

   function init() {
    canvas1 = document.getElementById("canvas");
    ctx = canvas1.getContext("2d");
    cwidth = canvas1.width;
    cheight = canvas1.height;
    ta = document.getElementById("directions");
    nextstep = 0;
    ctx.fillStyle = "white";
    ctx.lineWidth = origwidth;
    origstyle = ctx.strokeStyle;
    ctx.font = "15px Georgia, Times, serif";
    donext();
   }

   function directions() {

    ctx.fillStyle = "black";
    ctx.font = "15px Georgia, Times, serif";
    ctx.fillText("Make valley fold", 10,20); 
    valley(200,18,300,18,"orange");
    ctx.fillText("Make mountain fold",10,50);
    mountain(200,48,300,48,"orange");
    ctx.fillText("unfolded fold line",10,100);
    skinnyline(200,98,300,98); 
    ctx.fillText("When sense of fold matters:",10,150);
    ctx.fillText("unfolded valley fold", 10,180);
    valley(200,178,300,178); 
    ctx.fillText("unfolded mountain fold",10,210);
    mountain(200,208,300,208); 
    ctx.fillStyle = "white";
    }

   function donext() {
    if (nextstep>=steps.length) {
    nextstep=steps.length-1;
    }
    if (v) {
    v.pause();
    v.style.display = "none";
    v = undefined;
    canvas1.height = 480;
    }
    ctx.clearRect(0,0,cwidth,cheight);
    ctx.lineWidth = origwidth;
    steps[nextstep][0]();
    ta.innerHTML = steps[nextstep][1];
    nextstep++;
   }

   function goback() {
    nextstep = nextstep -2;
    if (nextstep<0) {
    nextstep = 0;
    }
    donext();
   }


   function shortdownarrow(x,y) {
      
    ctx.beginPath();
    ctx.moveTo(x,y-20);
    ctx.lineTo(x,y-7);
    ctx.moveTo(x-5,y-12);
    ctx.lineTo(x,y-7); 
    ctx.moveTo(x+5,y-12); 
    ctx.lineTo(x,y-7);
    ctx.closePath(); 
    ctx.stroke(); 
   }
    
   function proportion(x1,y1,x2,y2,p) {
     
    var xs = x2-x1; 
    var ys = y2-y1;
    var x = x1+ p*xs;
    var y = x1+ p*xs;
    return ([x,y]); 
    }

    function skinnyline(x1,y1,x2,y2) {
     
        ctx.lineWidth = 1; 
        ctx.beginPath(); 
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2); 
        ctx.closePath(); 
        ctx.stroke();
        ctx.lineWidth = origwidth; 
    }

    var origstyle; 
    var origwidth = 2;

    function valley(x1,y1,x2,y2,color) { 
      
        var px=x2-x1;
        var py = y2-y1; 
        var len = dist(x1,y1,x2,y2);
        var nd = Math.floor(len/(dashlen+dgap)); 
        var xs = px/nd; 
        var ys = py/nd; 
        if (color) ctx.strokeStyle = color;
        ctx.beginPath();
        for (var n=0;n<nd;n++) { 
            ctx.moveTo(x1+n*xs,y1+n*ys);
            ctx.lineTo(x1+n*xs+dratio*xs,y1+n*ys+dratio*ys);
    }

    ctx.closePath(); 
    ctx.stroke(); 
    ctx.strokeStyle = origstyle; 
    }

    function mountain(x1,y1,x2,y2,color) {

        var px=x2-x1; 
        var py = y2-y1;
        var len = dist(x1,y1,x2,y2); 
        var nd = Math.floor(len/ddtotal); 
        var xs = px/nd;
        var ys = py/nd;

        if (color) ctx.strokeStyle = color; 
        ctx.beginPath();
        for (var n=0;n<nd;n++) { 
            ctx.moveTo(x1+n*xs,y1+n*ys); 
            ctx.lineTo(x1+n*xs+ddratio1*xs, y1+n*ys+ddratio1*ys);
            ctx.moveTo(x1+n*xs+ddratio2*xs, y1+n*ys+ddratio2*ys); 
            ctx.lineTo(x1+n*xs+ddratio3*xs, y1+n*ys+ ddratio3*ys); 

    }
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = origstyle; 
    }
    
    

         function curvedarrow(x1,y1,x2,y2,px,py){
            
            var arrowanglestart; 
            var arrowanglefinish; 
            var d = dist(x1,y1,x2,y2); 
            var rad=Math.sqrt(4.25*d*d); 

            var ctrx; 
            var ctry; 
            var ex; 
            var ey; 

            var angdel = Math.atan2(d/2,2*d);
            var fromhorizontal; 
            ctx.strokeStyle = "red"; 

            ctx.beginPath();

            if (y1==y2) { 

                arrowanglestart = 1.5*Math.PI-angdel;
                arrowanglefinish = 1.5*Math.PI+angdel;
                ctrx = .5*(x1+x2) +px; 
                ctry = y1+2*d +py;
                if (x1<x2) { 

                    ctx.arc(ctrx,ctry, rad,arrowanglestart,arrowanglefinish, false);
                    fromhorizontal=2*Math.PI-arrowanglefinish;
                    ex = ctrx+rad*Math.cos(fromhorizontal);
                    cos(fromhorizontal);
                    ey = ctry - rad*Math.sin(fromhorizontal);
                    ctx.lineTo(ex-8,ey+8); 
                    ctx.moveTo(ex,ey); 
                    ctx.lineTo(ex-8,ey-8); 
                }
                else { 
                    ctx.arc(ctrx,ctry, rad,arrowanglefinish,arrowanglestart,true);
                    fromhorizontal=2*Math.PI-arrowanglestart;

                    ex = ctrx+rad*Math.cos(fromhorizontal);
                    ey = ctry - rad*Math.sin(fromhorizontal);

                    ctx.lineTo(ex+8,ey+8);
                    ctx.moveTo(ex,ey);
                    ctx.lineTo(ex+8,ey-8);
                }

                ctx.stroke();  
            }
    else if (x1==x2) {
        
        arrowanglestart = -angdel;
        arrowanglefinish = angdel;  
        ctrx = x1-2*d+px; 
        ctry = .5*(y1+y2) + py;

        if (y1<y2) { 

      ctx.arc(ctrx,ctry,rad,arrowanglestart,arrowanglefinish,false);
      fromhorizontal=- arrowanglefinish; 
      ex = ctrx+rad*Math.cos(fromhorizontal);
      ey = ctry - rad*Math.sin(fromhorizontal);
      ctx.lineTo(ex-8,ey-8);
      ctx.moveTo(ex,ey);
      ctx.lineTo(ex+8,ey-8);
        }
    else { 
   
    ctx.arc(ctrx,ctry, rad,arrowanglefinish,arrowanglestart, true);
    fromhorizontal=- arrowanglestart; 
    ex = ctrx+rad*Math.cos(fromhorizontal);
    ey = ctry - rad*Math.sin(fromhorizontal);
    
    ctx.lineTo(ex-8,ey+8);
    ctx.moveTo(ex,ey); 
    ctx.lineTo(ex+8,ey+8);
    }
    ctx.stroke();
    }
    ctx.strokeStyle = "black"; 
    }

   var steps= [
    [directions,"Diagram conventions"],
    [showkami,"Make quarter turn."],
    [diamond1,"Fold top point to bottom point."],
    [triangleM,"Divide line into thirds and make valley folds and unfold "],
    [thirds,"Fold in half to the left."],
    [rttriangle,"Fold down the right corner to the fold marking a third. "],
    [cornerdown,"Unfold everything."],
    [unfolded,"Prepare to sink middle square by reversing folds as indicated ..."],
    [changedfolds,"note middle square sides all valley folds, some other folds changed. Flip over."],
    [precollapse,"Push sides to sink middle square."],
    [playsink,"Sink square, collapse model."],
    [littleguy,"Now fold back the right flap to center valley fold. You are bisecting the indicated angle."],
    [oneflapup,"Do the same thing to the flap on the left"],
    [bothflapsup,"Make fins by wrapping top of right flap around 1 layer and left around back layer"],
    [finsp,"Now make lips...make preparation folds"],
    [preparelips,"and turn lips inside out. Turn corners in..."],
    [showcleftlip,"...making cleft lips."],
    [lips,"Pick up fish and look down throat..."],
    [showthroat1,"Stick your finger in its mouth and move the inner folded material to one side"],
    [showthroat2,"Throat fixed."],
    [rotatefish,"Squeeze & release top and bottom to make fish's mouth close and open"],
    [playtalk,"Talking fish."]
   ];

var diag = kamiw* Math.sqrt(2.0)*i2p; 
var ax = 10;
var ay = 220; 
var bx = ax+ .5*diag;
var by = ay - .5*diag;
var cx = ax + diag; 

var cy = ay;
var dx = bx;
var dy = ay + .5*diag;
var e = proportion(ax,ay,cx,cy,.333333);

var ex = e[0];
var ey = e[1];
var f = proportion(ax,ay,cx,cy,.666666);
var fx = f[0];
var fy = f[1];
var g = proportion(ax,ay,dx,dy,.666666);
var gx = g[0];
var gy = g[1];
var h = proportion(cx,cy,dx,dy,.666666);
var hx = h[0];
var hy = h[1];
var jx = ax + .5*diag;
var jy = ay;
var diag6 = diag/6;
var gry = ay-(gy-ay);
var kx = ax+diag/3; 
var ky = ay;
var lx = kx + diag/3;

var ly = ay;
var mx = ax + diag/6;
var innersq = Math.sqrt(2)*diag/6;
var my = ay + innersq*Math.sin(Math.PI/4);
var nx = ax+diag/3+diag/6;
var ny = my;
var px = mx;
var py = dy;
var rx = nx;
var ry = py;
var qx = kx;
var qy = hy;
var dkq = qy-ky;
var sx = kx + (dkq/Math.cos(Math.PI/8))*Math.sin(Math.PI/8);
var sy = ay;
var tx = kx; 
var ty = qy-dist(qx,qy,lx,ly);
var xxa = intersect(sx,sy,qx,qy,kx, ky,nx,ny);
var xxx = xxa[0];
var xxy = xxa[1];
var xxlx = kx-(xxx-kx);
var xxly = xxy;
var slx = kx- (sx-kx);

var sly = sy;
var tlx = tx-5;
var tly = ty;
var dkt=ky-ty;
var finlx = kx-dkt; 
var finly = ky;
var finrx = kx+dkt;
var finry = ky;
var w = Math.cos(Math.PI/4)*dkt;
var wx = kx-.5*dkt;
var wy = w*Math.sin(Math.PI/4)+ky;
var zx = kx+.5*dkt;
var zy = wy;
var plipx = px;
var plipy = py-10;
var rlipx = rx;
var rlipy = ry-10;
var plipex = px - 10;
var plipey = plipy;
var rlipex = rx + 10;
var rlipey = rlipy;
var rclipcleft1 = proportion(rlipex,rlipey,rlipx,rlipy,.5);
var pclipcleft1 = proportion(plipex,plipey,plipx,plipy,.5);

var rclipcleft2 = proportion(rlipex, rlipey,qx,qy,.1);
    var pclipcleft2 = proportion(plipex, plipey,qx,qy,.1);
    var rcx1 = rclipcleft1[0];
    var rcy1 = rclipcleft1[1];
    var rcx2 = rclipcleft2[0];
    var rcy2 = rclipcleft2[1];
    var pcx1 = pclipcleft1[0];
    var pcy1 = pclipcleft1[1];
    var pcx2 = pclipcleft2[0];
    var pcy2 = pclipcleft2[1];
    
    var v; 
    var throat1 = new Image(); 
    throat1.src = "throat1.jpg"; 
    var throat2 = new Image(); 
    throat2.src = "throat2.jpg";
    var cleft = new Image(); 
    cleft.src="cleftlip.jpg";
    
    function showcleftlip() { 
     ctx.drawImage(cleft,40,40);
    } 
    function showthroat1() { 
     ctx.drawImage(throat1,40,40);
    }  
    function showthroat2() { 
        ctx.drawImage(throat2,40,40); 
    } 
    function playtalk() { 
     v = document.getElementById("talk");
   
     v.style.display="block"; 
     v.currentTime = 0;
     v.play(); 
     canvas1.height = 126;
    }

    function playsink() { 
        v = document.getElementById("sink");
        v.style.display="block"; 
        v.currentTime = 0; 
        v.play(); 
        canvas1.height = 178; 
       }

       function lips() { 
        ctx.fillStyle = "teal"; 
        ctx.beginPath();
        ctx.moveTo(finlx,finly);
        ctx.lineTo(kx,ky);
        ctx.lineTo(wx,wy); 
        ctx.lineTo(finlx,finly);
        ctx.moveTo(finrx,finry);
        ctx.lineTo(kx,ky); 
        ctx.lineTo(zx,zy); 
        ctx.lineTo(finrx,finry); 
        ctx.moveTo(mx,my);
        ctx.lineTo(kx,ky); 
        ctx.lineTo(xxx,xxy); 
        ctx.lineTo(qx,qy); 
        ctx.lineTo(plipx,plipy); 
        ctx.lineTo(mx,my);
        ctx.moveTo(xxx,xxy); 
        ctx.lineTo(nx,ny); 
        ctx.lineTo(rlipx,rlipy); 
        ctx.lineTo(qx,qy); 
        ctx.lineTo(xxx,xxy);
        ctx.closePath(); 
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle="white"; 
        ctx.beginPath(); 
        ctx.moveTo(qx,qy); 
        ctx.lineTo(pcx2,pcy2); 
        ctx.lineTo(pcx1,pcy1); 
        ctx.lineTo(plipx,plipy); 
        ctx.lineTo(qx,qy); 
        ctx.lineTo(rcx2,rcy2);

        ctx.lineTo(rcx1,rcy1);
 ctx.lineTo(rlipx,rlipy);
 ctx.lineTo(qx,qy); 
 ctx.closePath(); 
 ctx.fill(); 
 ctx.stroke(); 
 skinnyline(kx,ky,qx,qy);
 ctx.fillStyle="teal"; 
}

function rotatefish() { 
 ctx.save(); 
 ctx.translate(kx,my); 
 ctx.rotate(-Math.PI/2); 
 ctx.translate(-kx,-my);
 lips(); 
 ctx.restore();
}

function preparelips() { 
 ctx.fillStyle="teal";
 fins(); 
 valley(qx,qy,rlipx,rlipy); 
 valley(qx,qy,plipx,plipy); 
}

function finsp() {
 ctx.fillStyle="teal"; 
fins(); 
valley(qx,qy,rlipx,rlipy,"orange"); 
valley(qx,qy,plipx,plipy,"orange"); 
}

function fins() { 
 ctx.beginPath(); 
 ctx.moveTo(finlx,finly); 
 ctx.lineTo(kx,ky); 
 ctx.lineTo(wx,wy);
 ctx.lineTo(finlx,finly); 
 ctx.moveTo(finrx,finry); 
 ctx.lineTo(kx,ky); 
 ctx.lineTo(zx,zy); 
 ctx.lineTo(finrx,finry);
 ctx.moveTo(mx,my);
 ctx.lineTo(kx,ky);
 ctx.lineTo(xxx,xxy);
 ctx.lineTo(qx,qy);
 ctx.lineTo(px,py); 
 ctx.lineTo(mx,my);
 ctx.moveTo(xxx,xxy); 
 ctx.lineTo(nx,ny); 
 ctx.lineTo(rx,ry); 
 ctx.lineTo(qx,qy); 
 ctx.lineTo(xxx,xxy); 

 ctx.closePath(); 
 ctx.fill(); 
 ctx.stroke(); 
 skinnyline(kx,ky,qx,qy); 
}
function bothflapsup () { 
 ctx.fillStyle="teal"; 
 ctx.beginPath(); 
 ctx.moveTo(slx,sly); 
 ctx.lineTo(tlx,tly); 
 ctx.lineTo(kx,ky); 
 ctx.lineTo(xxlx,xxly); 
 ctx.lineTo(slx,sly); 
 ctx.moveTo(mx,my); 
 ctx.lineTo(kx,ky); 
 ctx.lineTo(sx,sy); 
 ctx.lineTo(qx,qy); 
 ctx.lineTo(px,py); 
 ctx.lineTo(mx,my); 
 ctx.moveTo(tx,ty); 
 ctx.lineTo(sx,sy);
 ctx.lineTo(kx,ky); 
 ctx.lineTo(tx,ty);
 ctx.moveTo(xxx,xxy); 
 ctx.lineTo(nx,ny); 

 ctx.lineTo(rx,ry);
 ctx.lineTo(qx,qy); 
 ctx.lineTo(xxx,xxy); 
 ctx.closePath(); 
 ctx.fill(); 
 ctx.stroke(); 
 skinnyline(kx,ky,qx,qy);
} 
function oneflapup() { 
 ctx.fillStyle="teal";
 ctx.beginPath();
 ctx.moveTo(ax,ay); 
 ctx.lineTo(kx,ky); 
 ctx.lineTo(mx,my); 
 ctx.lineTo(ax,ay); 
 ctx.moveTo(kx,ky); 
 ctx.lineTo(sx,sy); 
 ctx.lineTo(qx,qy); 
 ctx.lineTo(px,py); 
 ctx.lineTo(mx,my); 
 ctx.lineTo(kx,ky); 
 ctx.moveTo(xxx,xxy); 
 ctx.lineTo(nx,ny); 
 ctx.lineTo(rx,ry); 
 ctx.lineTo(qx,qy);
 
 ctx.lineTo(xxx,xxy); 
 ctx.moveTo(kx,ky); 
 ctx.lineTo(tx,ty); 
 ctx.lineTo(sx,sy); 
 ctx.lineTo(kx,ky); 
 ctx.closePath(); 
 ctx.fill();
 ctx.stroke(); 
 skinnyline(qx,qy,kx,ky);
}
function littleguy() { 
 ctx.fillStyle="teal";
 ctx.beginPath(); 
 ctx.moveTo(ax,ay); 
 ctx.lineTo(kx,ky); 
 ctx.lineTo(mx,my); 
 ctx.lineTo(ax,ay); 
 ctx.moveTo(kx,ky); 
 ctx.lineTo(lx,ly); 
 ctx.lineTo(px,py); 
 ctx.lineTo(mx,my); 
 ctx.lineTo(kx,ky); 
 ctx.moveTo(nx,ny); 
 ctx.lineTo(rx,ry); 
 ctx.lineTo(qx,qy); 

 ctx.lineTo(nx,ny);
 ctx.closePath();
 ctx.fill(); 
 ctx.stroke(); 
 skinnyline(qx,qy,kx,ky); 
 ctx.beginPath();
 ctx.arc(qx,qy,30,-.5*Math.PI,-.25*Math.PI,false);
 ctx.stroke();
 mountain(qx,qy,sx,sy,"orange"); 
} 
function unfolded() { 
 diamond(); 
 valley(ax,ay,cx,cy); 
 valley(ex,ey,gx,gy); 
 valley(fx,fy,hx,hy);
 mountain(ex,ey,gx,gry); 
 mountain(fx,fy,hx,gry);
 valley(jx,jy,dx,dy); 
 mountain(jx,jy,bx,by); 
 valley(ex,ey,jx,jy+diag6); 
 valley(jx,jy-diag6,fx,fy); 
 mountain(ex,ey,jx,jy-diag6); 
 mountain(jx,jy+diag6,fx,fy); 
} 

function precollapse() { 
    diamondc(); 
    mountain(ax,ay,cx,cy); 
    valley(ex,ey,gx,gy); 
    valley(fx,fy,hx,hy); 
    valley(ex,ey,gx,gry); 
    valley(fx,fy,hx,gry); 
    valley(jx,jy-diag6,jx,jy+diag6); 
    mountain(jx,jy-diag6,bx,by);
    mountain(jx,jy+diag6,dx,dy); 
    mountain(ex,ey,jx,jy+diag6);
    mountain(jx,jy-diag6,fx,fy); 
    mountain(ex,ey,jx,jy-diag6);
    mountain(jx,jy+diag6,fx,fy); 
   }
   function changedfolds() { 
    
    diamond(); 
    valley(ax,ay,cx,cy); 
    mountain(ex,ey,gx,gy); 
    mountain(fx,fy,hx,hy); 
    mountain(ex,ey,gx,gry); 
    mountain(fx,fy,hx,gry); 
    mountain(jx,jy-diag6,jx,jy+diag6); 
    valley(jx,jy-diag6,bx,by);

 valley(jx,jy+diag6,dx,dy); 
 valley(ex,ey,jx,jy+diag6); 
 valley(jx,jy-diag6,fx,fy); 
 valley(ex,ey,jx,jy-diag6); 
 valley(jx,jy+diag6,fx,fy); 
} 
function triangleM() { 
 triangle(); 
 shortdownarrow(ex,ey); 
 shortdownarrow(fx,fy); 
 valley(ex,ey,gx,gy,"orange"); 
 valley(fx,fy,hx,hy,"orange");
} 
function thirds() { 
 triangle(); 
 skinnyline(ex,ey,gx,gy); 
 skinnyline(fx,fy,hx,hy); 
 curvedarrow(cx,cy,ax,ay,0,-20); 
 valley(jx,jy,dx,dy,"orange"); 
} 
function cornerdown() {
 rttriangle(); 
 ctx.clearRect(ex,ey, diag6+5,diag6); 
 ctx.beginPath();
 ctx.moveTo(ex,ey); 
 
 ctx.lineTo(ex+diag6,ey+diag6);
 ctx.lineTo(ex,ey+diag6); 
 ctx.lineTo(ex,ey); 
 ctx.closePath(); 
 ctx.fill(); 
 ctx.stroke(); 
} 
function showkami() { 
 ctx.strokeRect(kamix,kamiy,kamiw*i2p,kamih*i2p);

 } 
function diamond1() { 
 diamond(); 
 valley(ax,ay,cx,cy,"orange"); 
 curvedarrow(bx,by,dx,dy,10,0); 
} 
function diamondc() { 
 ctx.beginPath(); 
 ctx.moveTo(ax,ay); 
 ctx.lineTo(bx,by); 
 ctx.lineTo(cx,cy); 
 ctx.lineTo(dx,dy); 
 ctx.lineTo(ax,ay); 
 ctx.closePath();

 ctx.fillStyle="teal";
 ctx.fill(); 
 ctx.stroke(); 
} 
function diamond() { 
 ctx.beginPath(); 
 ctx.moveTo(ax,ay);
 ctx.lineTo(bx,by); 
 ctx.lineTo(cx,cy); 
 ctx.lineTo(dx,dy);
 ctx.lineTo(ax,ay); 
 ctx.closePath(); 
 ctx.stroke(); 
} 
function triangle() { 
 ctx.fillStyle="teal";
 ctx.beginPath(); 
 ctx.moveTo(ax,ay); 
 ctx.lineTo(cx,cy); 
 ctx.lineTo(dx,dy); 
 ctx.lineTo(ax,ay);
 ctx.closePath(); 
 ctx.fill(); 
ctx.stroke(); 
}

function rttriangle() {
    ctx.fillStyle="teal"; 
    ctx.beginPath();
    ctx.moveTo(ax,ay); 
    ctx.lineTo(jx,jy);
    ctx.lineTo(dx,dy); 
    ctx.lineTo(ax,ay);
    ctx.closePath(); 
    ctx.fill(); 
   valley(ex,ey,ex+diag6,ey+diag6,"orange"); 
    skinnyline(ex,ey,gx,gy); 
   }
