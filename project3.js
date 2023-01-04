"use strict"
const body=document.querySelector('body')
const game=document.getElementsByClassName('game')[0]
const startbutton=document.getElementsByClassName('start')[0]
const char=document.getElementsByClassName('character')[0]
const speedy=document.getElementsByClassName('changespeed')[0]
const shotwindow=document.getElementsByClassName('shot')[0]
const lvlhead=document.getElementsByClassName('header')[0]
const gameover=document.getElementsByClassName('gameover')[0]
const scorecount=document.getElementsByClassName('score')[0]
const chararr=[]
const arr2=[]
var speedconst=1
var shot=0
var score=0
var speed=0.5
var godown= false;
var goup=false;
var goleft=false;
var goright=false;
var level=1;
var req=50
var gameloss=5
chararr.push({element:char, x0:50,y0:160})
char.style=`top:${chararr[0].y0}px; left:${chararr[0].x0}px`
game.classList.add('notstarted')
startbutton.addEventListener('click', initiate);
function initiate(event){
    if (game.classList.contains('notstarted')){
        var doc = document.documentElement;
        doc.requestFullscreen()
        const start=document.getElementsByClassName('start')
        start[0].style.display='none'
        setTimeout(startit,1500)
        startbutton.removeEventListener('click', initiate)
    }

}
speedy.addEventListener('click', changespeed)
function changespeed(event){
    speed=speed+0.2
    speedconst=speedconst+1
    speedy.innerHTML=`Speed: ${speedconst}`
}
function startit(event){
        const start=document.getElementsByClassName('start')
        game.style.display='block'
        game.classList.remove('notstarted')
        main()
}

function main(currentTime){
    const platform1=document.getElementsByClassName('spawner')
    const arr1=[]
    const crv=document.getElementsByClassName('cont1')
    var time=1000
    spawn()
    function spawn(event){
            const elem=document.createElement('div');
            elem.classList.add('cont1');
            elem.addEventListener('click',die)
            k=Math.floor(Math.random()*3)
            const y0=220.5+250*k
            arr1.push({element: elem, y:y0, x:1500});
            k=Math.floor(Math.random()*3)
            platform1[k].appendChild(elem);
            if (shot==20 || shot==40){
                time=time-100
            }
            if (gameloss>0){
                setTimeout(spawn,time)
            }
            if (gameloss===0){
                for (let i=0;i<arr1.length;i++){
                    const e=arr1[i]
                    e.element.classList.add('dead')
                }
                lvlhead.innerHTML='Press "Game Over" to restart'
                gameover.style.display='block'
                gameover.addEventListener('click', function(e){
                    location.reload()
                    })
            }
            if (level<=5){
                if (shot==req-1){
                    req=req-10
                    shot=0
                    level=level+1
                    lvlhead.innerHTML=`Level: ${level}`
                    changespeed()   
                }
            }
            

        }
    function die(event){
        const e=event.currentTarget
        e.classList.add('dead')
    }
    var k=0
    requestAnimationFrame(movesprite)
    function movesprite(currentTime){
        for (let i=0;i<arr1.length;i++){
            const e=arr1[i]
            if (e.element.classList.contains('dead')){
                e.element.style.backgroundColor='red';
                arr1.splice(i,1)
                e.element.parentNode.removeChild(e.element)
            }
            e.x=e.x-speed
            e.element.style=`left:${e.x}px; top:${e.y}px`;
            if (e.x<-50){
                gameloss=gameloss-1
                shotwindow.innerHTML=`Lives: ${gameloss}`
                
                arr1.splice(i,1)
                e.element.parentNode.removeChild(e.element)
            }
            
        }
        const elem=chararr[0]
        if (goup===true){
            if (elem.y0>=0){
                elem.y0=elem.y0-2   
                elem.element.style=`top:${elem.y0}px; left:${elem.x0}px;`
            }

        }
        if (godown===true){
            if (elem.y0<=670){
                elem.y0=elem.y0+2
                elem.element.style=`top:${elem.y0}px; left:${elem.x0}px;`
            }
        }
        if (goright===true){
            if (elem.x0<=1430){
                elem.x0=elem.x0+2
                elem.element.style=`top:${elem.y0}px; left:${elem.x0}px;`
            }
        }
        if (goleft===true){
            if (elem.x0>=5){
                elem.x0=elem.x0-2
                elem.element.style=`top:${elem.y0}px; left:${elem.x0}px;` 
            }
        }
        requestAnimationFrame(movesprite)
    }
    requestAnimationFrame(bullets)
    function bullets(currentTime){
        for (let i=0;i<arr2.length;i++){
            const bull=arr2[i]
            bull.x=bull.x+3           
            bull.element.style.left=`${bull.x}px`
            if (bull.x>=bull.init+600 || bull.x>screen.width-10){
                bull.element.parentNode.removeChild(bull.element)
                arr2.splice(i,1)
            }
            for (let j=0;j<arr1.length;j++){
                const sprt=arr1[j]
                if (sprt.x<=bull.x && sprt.x+50>=bull.x){
                    if (sprt.y+100>=bull.y  && sprt.y<=bull.y){
                        sprt.element.classList.add('dead')
                        arr2.splice(i,1)
                        bull.element.parentNode.removeChild(bull.element)
                        shot=shot+1
                        score=score+1
                        scorecount.innerHTML=`Score: ${score}`
                    }
                    
                }
            }
        }
        requestAnimationFrame(bullets)
    }
}
body.addEventListener('keydown', function(e){
    const elem=chararr[0]
    if (e.keyCode===68){
        goright=true
    }
    if (e.keyCode===65){
        goleft=true
    }
    if (e.keyCode===87){
        goup=true
    }
    if (e.keyCode===83){
        godown=true
        
    } 
});
body.addEventListener('keyup', function(e){
    const elem=chararr[0]
    if (e.keyCode===68){
        goright=false
    }
    if (e.keyCode===65){
        goleft=false;
    }
    if (e.keyCode===87){
        goup=false
    }
    if (e.keyCode===83){
        godown=false
    } 
});
body.addEventListener('keyup', function(e){
    if (e.keyCode===32){
        const bullet=document.createElement('div')
        bullet.classList.add('bullet')
        var x0=chararr[0].x0+30
        var y0=chararr[0].y0+140
        bullet.style.top=`${y0}px`
        bullet.style.left=`${x0}px`
        arr2.push({element:bullet, x:x0, y:y0, init:x0})
        game.appendChild(bullet)


    }
});