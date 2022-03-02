var canvas=document.getElementById("c");
var ctx=canvas.getContext("2d");
var base=document.getElementById("d");
var baseCtx=base.getContext("2d");
var tank=document.getElementById("tank");
var tile=document.getElementById("tile");
var x=0
var y=0
var xpos=0
var ypos=2
var xcam=0
var ycam=0
var left=0
var right=0
var up=0
var down=0
var speed=0.5
var slip=0.4
var visualy=0
var touchingtiles=[0,0,0,0]
var collisionmap=[15,10,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
        0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var map=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
        0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]

document.addEventListener("keydown",function(event){
    if(event.keyCode==38){
        up=1;
    }if(event.keyCode==37){
        left=1;
    }if(event.keyCode==40){
        down=1;
    }if(event.keyCode==39){
        right=1;
    }if(event.key=='x'){
        slip=0.7;
        speed=0.5;
    }
});
document.addEventListener("keyup",function(event){
    if(event.keyCode==38){
        up=0;
    }if(event.keyCode==37){
        left=0;
    }if(event.keyCode==40){
        down=0;
    }if(event.keyCode==39){
        right=0;
    }if(event.key=='x'){
        slip=0.4;
        speed=0.5;
    }
});
function gettile(get){
    var get3=0
    function repeat4(get2){
        if(get2>5){
            get3=get3+1;
            repeat4(get2-6);
        }else{
            return(get2);
        }
    }
    return[repeat4(get),get3];
}function maploop(times,times2){
    if(times==0){
        times=17;
        times2=times2-1;
    }if(times2!=0){
        maploop(times-1,times2);
    }else{
        return;
    }baseCtx.drawImage(tile,0,16,16,16,(16-times+Math.round((xcam-112)/16))*16,(11-times2+Math.round((ycam-72)/16))*16,16,16);
}
setInterval(() => {
    base.width=collisionmap[0]*16;
    base.height=collisionmap[1]*16;
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ctx.imageSmoothingEnabled = false;
    if(up==1){
        y=y-speed;
    }if(down==1){
        y=y+speed;
    }if(left==1){
        x=x-speed;
    }if(right==1){
        x=x+speed;
    }
    xpos=xpos+x;
    ypos=ypos+y;
    ycam=(ypos-ycam)*(0.1)+ycam;
    xcam=(xpos-xcam)*(0.1)+xcam;
    function check(){
        touchingtiles[0]=Math.round((xpos-8)/16)+Math.round((ypos-8)/16)*collisionmap[0]
        touchingtiles[1]=Math.round((xpos+5.999)/16)+Math.round((ypos-8)/16)*collisionmap[0]
        touchingtiles[2]=Math.round((xpos-8)/16)+Math.round((ypos+5.999)/16)*collisionmap[0]
        touchingtiles[3]=Math.round((xpos+5.999)/16)+Math.round((ypos+5.999)/16)*collisionmap[0]
        if(collisionmap[touchingtiles[0]+2]==1||collisionmap[touchingtiles[1]+2]==1||collisionmap[touchingtiles[2]+2]==1||collisionmap[touchingtiles[3]+2]==1){
            return true;
        }else{
            return false;
        }
    }if(check()){
        ypos=ypos-y
        if(check()){
            ypos=ypos+y
            xpos=xpos-x
            if(check()){
                xpos=xpos+x
                function repeat3(){
                    if(x<0){
                        xpos=Math.round((xpos-1)/16)*16;
                    }else{
                        xpos=Math.round((xpos+1)/16)*16+2;
                    }if(y<0){
                        ypos=Math.round((ypos-1)/16)*16;
                    }else{
                        ypos=Math.round((ypos+1)/16)*16+2;
                    }
                    if(check()){
                        repeat3();
                    }
                }repeat3();
                x=0
                y=0
            }else{
                xpos=xpos+x
                function repeat2(){
                    if(x<0){
                        xpos=Math.round((xpos-1)/16)*16;
                    }else{
                        xpos=Math.round((xpos+1)/16)*16+2;
                    }if(check()){
                        repeat2();
                    }
                }repeat2();
                x=0
            }
        }else{
            ypos=ypos+y
            function repeat(){
                if(y<0){
                    ypos=Math.round((ypos-1)/16)*16;
                }else{
                    ypos=Math.round((ypos+1)/16)*16+2;
                }if(check()){
                    repeat();
                }
            }repeat();
            y=0
        }
    }
    if(xcam>base.width-128){
        xcam=base.width-128;
    }if(ycam>base.height-88){
        ycam=base.height-88;
    }if(xcam<112){
        xcam=112;
    }if(ycam<72){
        ycam=72;
    }if(xpos>base.width-14){
        xpos=base.width-14;
        x=0
    }if(ypos>base.height-14){
        ypos=base.height-14;
        y=0
    }if(xpos<0){
        xpos=0;
        x=0
    }if(ypos<0){
        ypos=0;
        y=0
    }
    document.getElementById("p").innerHTML = touchingtiles+','+Math.round(1000*x)/1000+','+Math.round(1000*y)/1000+','+check()+','+gettile(7);
    maploop(17,12);
    //baseCtx.drawImage(tile,0,0,16,16,0,0,16,16);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //ctx.fillRect(xpos,ypos,50,50);
    ctx.drawImage(base,xcam-112,ycam-72,240,160,canvas.width/2-(canvas.height*3/4),0,canvas.height*3/2,canvas.height);
    ctx.drawImage(base,canvas.width-150,canvas.height-100,150,100);
    ctx.fillStyle="#0000ff"
    ctx.fillRect(Math.round(canvas.width/2-(canvas.height/20)+((xpos-xcam)*canvas.height/160)),Math.round(canvas.height/2-(canvas.height/20)+((ypos-ycam)*canvas.height/160)), canvas.height/10*7/8, canvas.height/10*7/8);
    x=x*slip;
    y=y*slip;
  }, 100/6);