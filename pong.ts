import { interval, fromEvent, from, zip, Observable } from 'rxjs'
import { map, scan, filter, merge, flatMap, take, concat, withLatestFrom, takeUntil} from 'rxjs/operators'


function pong() {
    // Inside this function you will use the classes and functions 
    // from rx.js
    // to add visuals to the svg element in pong.html, animate them, and make them interactive.
    // Study and complete the tasks in observable exampels first to get ideas.
    // Course Notes showing Asteroids in FRP: https://tgdwyer.github.io/asteroids/ 
    // You will be marked on your functional programming style
    // as well as the functionality that you implement.
    // Document your code!  

    // creates a constant which accesses the canvas
    const canvas = document.getElementById("canvas")

    // creates the paddle used by the player
    const player_paddle = document.createElementNS(canvas.namespaceURI, 'rect')!;
    // sets the attributes of the paddle and appends into onto the canvas
    Object.entries({
      x: "10", y: "250",
      fill: "white", 
      width: "10", height: "50"
    }).forEach(([key, val])=>player_paddle.setAttribute(key, val))
    canvas.appendChild(player_paddle)

    // creates the paddle used by the computer
    const com_paddle = document.createElementNS(canvas.namespaceURI, 'rect')!;
    // sets the attribtues of the paddle and appends it onto the canvas
    Object.entries({
      x: "580", y: "250",
      fill: "white", 
      width: "10", height: "50"
    }).forEach(([key, val])=>com_paddle.setAttribute(key, val))
    canvas.appendChild(com_paddle)

    // creates the ball of the game
    const ball = document.createElementNS(canvas.namespaceURI, 'circle')!;
    // sets the attributes of the ball and appends it onto the canvas
    Object.entries({
      fill: "white", cx: 300, cy: 300, r: 5, stroke: 15,
      speed: 5, xVelocity: -1, yVelocity: 1
    }).forEach(([key, val])=>ball.setAttribute(key, String(val)))
    canvas.appendChild(ball)

    // allows the player to move the paddle by pressing the 'w' key to go up and 's' key to down
    const move_paddle = fromEvent<KeyboardEvent>(document, "keydown").subscribe((event: KeyboardEvent) =>{
      console.log(player_paddle)
      if(event.key == 'w'){
        player_paddle.setAttribute('y', String(-5 + Number(player_paddle.getAttribute('y'))));
      }

      else if(event.key == 's'){
        player_paddle.setAttribute('y', String(5 + Number(player_paddle.getAttribute('y'))));
      }
    }
    );

    // moves the ball across the canvas
    const move_ball = interval(10).pipe(take(600 - Number(ball.getAttribute('cy')) - Number(ball.getAttribute('r')))
    ).subscribe( () => {
      ball.setAttribute('cx', String(Number(ball.getAttribute('cx')) + Number(ball.getAttribute('xVelocity'))))
      ball.setAttribute('cy', String(Number(ball.getAttribute('cy')) + Number(ball.getAttribute('yVelocity'))))
    });

    // creates the score of the player
    const player_score = document.createElementNS(canvas.namespaceURI, 'text')
    Object.entries({
      fill: "white", score: 0, x: 150, y: 150
    }).forEach(([key, val])=>ball.setAttribute(key, String(val)))
    canvas.appendChild(player_score)
    
    // creates the score of the computer
    const com_score = document.createElementNS(canvas.namespaceURI, 'text')
    Object.entries({
      fill: "white", score: 0, x: 450, y: 450
    }).forEach(([key, val])=>ball.setAttribute(key, String(val)))
    canvas.appendChild(com_score) 

    // checks if there is a collision between the ball and the paddles
    const collision = (b: Element)=>(p: Element) =>{
      if(Number(b.getAttribute("cx")) === Number(p.getAttribute("x"))){
        if(Number(b.getAttribute("cy")) === Number(p.getAttribute("y"))){
          b.setAttribute("xVelocity", String(-Number(b.getAttribute("xVelocity"))));
          b.setAttribute("yVelocity", String(-Number(b.getAttribute("yVelocity"))));
        }
      }
    }

    // call the collision checker 
    const collision_check = interval(10).pipe(map((_) => collision(ball),(player_paddle))).subscribe()

  }
  
  // the following simply runs your pong function on window load.  Make sure to leave it in place.
  if (typeof window != 'undefined')
    window.onload = ()=>{
      pong();
    }
  
  

