const typingText=document.querySelector(".typing-text p")
const inputField=document.querySelector(".wrapper .input-field")
const mistakeTag=document.querySelector(".Mistake span")
const timeTag=document.querySelector(".time span b")
const WpmTag=document.querySelector(".wpm span")
const CpmTag=document.querySelector(".cpm span")
const tryAgain=document.querySelector("button")

let time;
let maxTime=60;
let timeLeft=maxTime
let charIndex =mistakes=isType=0;

function randomParagraph(){
    let randIndex=Math.floor(Math.random()*paragraphs.length);
    typingText.innerHTML=""
   paragraphs[randIndex].split("").forEach(span=>{
      let spanTag=`<span>${span}</span>`
      typingText.innerHTML+=spanTag
   })
   typingText.querySelectorAll("span")[0].classList.add("active")
   document.addEventListener("keydown",()=>{
    inputField.focus();
   })
   document.addEventListener("click",()=>{
    inputField.focus()
   })
}
timeTag.innerText=maxTime
function initTyping(){
     let  characters=typingText.querySelectorAll("span")
     let typedChar=inputField.value.split("")[charIndex];

     if(charIndex<characters.length && timeLeft>0){
      if(!isType){
        time=setInterval(initTimer,1000)
        isType=true
    }

     
     if (typedChar === null || !typedChar) {
        charIndex--;
        // if( characters[charIndex].classList.contains("incorrect")){
        //     mistakes--;
        // }
         if(mistakes>0){
            mistakes--;
         }
        // Check if charIndex is still a valid index
        if (charIndex >= 0 && charIndex < characters.length) {
            characters[charIndex].classList.remove("correct","incorrect")
        }
    }
     else{
        if(characters[charIndex].innerText === typedChar){
            characters[charIndex].classList.add("correct")
            console.log("correct")
         }
         else{
            mistakes++;
           characters[charIndex].classList.add("incorrect")
         }
     }
     
     charIndex++;
     characters.forEach(span=>span.classList.remove("active"))
     characters[charIndex].classList.add("active")

     
     let wpm=Math.round((((charIndex-mistakes)/5)/(maxTime-timeLeft))*60)
     wpm=wpm<0 || !wpm || wpm=="infinity" ? 0:wpm;

     WpmTag.innerText=wpm
     mistakeTag.innerText=mistakes
     CpmTag.innerText=charIndex-mistakes
   }else{
      inputField.value=""
      clearInterval(time)
   }
   
}
function initTimer(){
      if(timeLeft>0){
        timeLeft--;
        timeTag.innerText=timeLeft
      }
      else{
        clearInterval(time)
      }
}
function resetGame(){
   randomParagraph();
   inputField.value=""
   clearInterval(time)
    timeLeft=maxTime;
    charIndex=mistakes=isType=0;
    timeTag.innerText=timeLeft
    mistakeTag.innerText=mistakes
    WpmTag.innerText=0;
    CpmTag.innerText=0;   
}
randomParagraph()
inputField.addEventListener("input",initTyping)
tryAgain.addEventListener("click",resetGame);