const key='little-lingo-progress';
let progress=Math.max(1,Math.min(5,Number(localStorage.getItem(key))||1));
const stops=[...document.querySelectorAll('.stop')];
const path=document.querySelector('#trail-progress');
const traveler=document.querySelector('#traveler');
const positions=[['7%','61%'],['28%','19%'],['48%','52%'],['73%','17%'],['95%','11%']];

function render(){
  stops.forEach((stop,i)=>stop.classList.toggle('done',i<progress));
  document.querySelector('#star-count').textContent=progress;
  const length=path.getTotalLength();
  path.style.strokeDasharray=`${length}`;
  path.style.strokeDashoffset=`${length*(1-(progress-1)/4)}`;
  traveler.style.left=positions[progress-1][0];traveler.style.top=positions[progress-1][1];
}

document.querySelectorAll('.play').forEach(button=>button.addEventListener('click',()=>{
  if(progress<5) progress++;
  localStorage.setItem(key,progress);render();
  document.querySelector('#modal').hidden=false;
}));
document.querySelectorAll('.close,.close-action').forEach(el=>el.addEventListener('click',()=>document.querySelector('#modal').hidden=true));
document.querySelector('#modal').addEventListener('click',e=>{if(e.target.id==='modal')e.currentTarget.hidden=true});
document.querySelector('#reset').addEventListener('click',()=>{progress=1;localStorage.setItem(key,progress);render()});
document.querySelector('#sound').addEventListener('click',e=>{e.currentTarget.classList.toggle('off');e.currentTarget.textContent=e.currentTarget.classList.contains('off')?'×':'♪'});
render();
