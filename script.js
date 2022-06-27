// variables
let size = null;
const screen = {
    imgMovil : window.matchMedia( '(max-width: 425px)' ),
    imgTablet: window.matchMedia( '(max-width: 768px) and (min-width: 425px)' ),
    imgLaptop : window.matchMedia( '(min-width: 1024px)' ),
    imgDesktop : window.matchMedia( '(min-width: 1440px)' )
};
const dataSkills = [];
const dataProyects = [];
const dataRetos = [];

const hora = document.querySelector("header > div.left > span");

const menu = document.querySelector("div.menu > ul");
const menuHabilidades = document.querySelector("#menuHabilidades");
const skills = document.querySelector(".habilidades > ul#skills");

const URLproyects = document.querySelector(".barNavigation > h1");
// const contentProyects = document.querySelector(".contentProyects");
const contentProyects = document.querySelector(".contentProyects > .content");
// const leftProyects = document.querySelector(".proyectos > div#left");
// const rightProyects = document.querySelector(".proyectos > div#right");
const leftProyects = document.querySelector(".proyectos > .contentProyects > div#left");
const rightProyects = document.querySelector(".proyectos > .contentProyects > div#right");

const URLretos = document.querySelector(".barGallery > h1");
// const contentRetos = document.querySelector(".contentRetos");
// const leftRetos = document.querySelector(".retos > div#left");
// const rightRetos = document.querySelector(".retos > div#right");
const contentRetos = document.querySelector(".contentRetos > .content");
const leftRetos = document.querySelector(".retos > .contentRetos > div#left");
const rightRetos = document.querySelector(".retos > .contentRetos > div#right");

const closeAcercade = document.querySelector(".ventanas > .acercade > .barra > picture > img");
const closeHabilidades = document.querySelector(".ventanas > .habilidades > .barra > picture:last-child > img");
const closeProyectos = document.querySelector(".ventanas > .proyectos > .barra > picture > img");
const closeRetos = document.querySelector(".ventanas > .retos > .barGallery > picture > img");
// const closeAcercade = document.querySelector(".ventanas > .acercade > .barra > picture > img");

// Muestra datos de perfil
function handlerClickMenu({target}) {
    // console.log(menu.children[0]);
    
    if (target.id === "acercade" || target.id === "habilidades" || target.id === "proyectos" || target.id === "retos" || target.id === "contacto"){
        const listImg = menu.querySelectorAll("img");
        // console.log(listImg["img#acercade"])
        // console.log(listImg)
        const ventanas = document.querySelectorAll("main > div.ventanas > div");
        menu.parentElement.classList.remove("active");
        ventanas.forEach(vetana=>{
            vetana.className === target.id ? vetana.classList.toggle("ventanaOpen") : vetana.classList.remove("ventanaOpen");
            vetana.classList.contains("ventanaOpen") && menu.parentElement.classList.add("active");
            // vetana.className === target.id ? menu : vetana.classList.remove("ventanaOpen");
            // listImg
        });
        listImg.forEach(img=>{
            img.id === target.id ? img.classList.toggle("active") : img.classList.remove("active");
        })
    }
}

// Realiza cambio vista de habilidades
function changeViewSkills(){
    const listGrid = document.querySelector(".habilidades > ul#skills");
    listGrid.classList.toggle("grid");
}

// list Skills
function cargaSkill (){
    if(dataSkills.length > 0){
        skills.innerHTML='';
        dataSkills.forEach((ele,index)=>{
            const item = `
                <li id="${index}"><a href="${ele.url}" target="_blank"><img src="./assets/icons/${ele.icon}" alt="${ele.name}"><h3>${ele.name}</h3></a></li>
            `;
    
            skills.insertAdjacentHTML("beforeend",item);
        });
    }
}

// lista Proyectos y Retos
function cargaItems (content,data,URL){
    if(data.length > 0){
        content.innerHTML='';
        data.forEach((ele,index)=>{
            const item = `
                <div id="${index}" style="background-image: url(${ele[size]})">
                    <div class="info">
                        <a href="${ele.repo}" target="_blank">
                        <h2>${ele.title}</h2>
                        <div class="badge">
                            ${ele.badge.map(b=>`<span>${b}</span>`)}
                        </div>
                        </a>
                    </div>
                </div>
            `;
            content.insertAdjacentHTML("beforeend",item);
        });
        URL.innerHTML = `<a href="${data[0].demo}" target="_blank">${data[0].demo}</a>`;
    }
}

// slide previo en Proyectos
function prevProyects() {
    // const a = document.querySelector(".contentProyects > div");
    const a = document.querySelector(".contentProyects > .content > div");
    totalProyects = dataProyects.length-1;
    let ml = a.style.marginLeft || 0;
    if( ml === 0 || Number(ml.split("%")[0]) === 0 ){
        ml = -((totalProyects+1) * 100);
    }else{
        ml = Number(ml.split("%")[0]);
    }
    a.style.marginLeft = (ml+100)+"%";
    const newURL = dataProyects[-(ml+100)/100].demo;
    if (dataProyects.length > 0) URLproyects.innerHTML = `<a href="${newURL}" target="_blank">${newURL}</a>`;

}

// slide siguiente en Proyectos
function nextProyects() {
    // const a = document.querySelector(".contentProyects > div");
    const a = document.querySelector(".contentProyects > .content > div");
    totalProyects = dataProyects.length-1;
    let ml = a.style.marginLeft || 0;
    if(ml !== 0){
        ml = Number(ml.split("%")[0]);
        if( -(ml/100) === totalProyects){
            ml = 100;
        }
    }
    a.style.marginLeft = (ml-100)+"%";
    const newURL = dataProyects[-(ml-100)/100].demo;
    if (dataProyects.length > 0) URLproyects.innerHTML = `<a href="${newURL}" target="_blank">${newURL}</a>`;
}


// slide previo en Retos
function prevRetos() {
    const a = document.querySelector(".contentRetos > .content > div");
    totalRetos = dataRetos.length-1;
    let ml = a.style.marginLeft || 0;
    if( ml === 0 || Number(ml.split("%")[0]) === 0 ){
        ml = -((totalRetos+1) * 100);
    }else{
        ml = Number(ml.split("%")[0]);
    }
    a.style.marginLeft = (ml+100)+"%";
    const newURL = dataRetos[-(ml+100)/100].demo;
    if (dataRetos.length > 0) URLretos.innerHTML = `<a href="${newURL}" target="_blank">${newURL}</a>`;

}

// slide siguiente en Retos
function nextRetos() {
    const a = document.querySelector(".contentRetos > .content > div");
    totalRetos = dataRetos.length-1;
    let ml = a.style.marginLeft || 0;
    if(ml !== 0){
        ml = Number(ml.split("%")[0]);
        if( -(ml/100) === totalRetos){
            ml = 100;
        }
    }
    a.style.marginLeft = (ml-100)+"%";
    const newURL = dataRetos[-(ml-100)/100].demo;
    if (dataRetos.length > 0) URLretos.innerHTML = `<a href="${newURL}" target="_blank">${newURL}</a>`;
}

function handlerCloseVentana(){
    const ventanas = document.querySelectorAll("main > div.ventanas > div");
    ventanas.forEach(vetana=>{
        vetana.classList.contains("ventanaOpen") && vetana.classList.remove("ventanaOpen");
    });
}

// recupera los skills
async function listSkills(){
    const rest = await fetch("./dataSkills.json",{cache:"no-cache"}).then(e=>e.json());
    dataSkills.push(...rest);
    cargaSkill();
}

// recupera los proyectos
async function listProyects(){
    // console.log(contentProyects)
    const rest = await fetch("./dataProyects.json",{cache:"no-cache"}).then(e=>e.json());
    dataProyects.push(...rest);
    cargaItems(contentProyects,dataProyects,URLproyects);
}

// recupera los retos
async function listRetos(){
    const rest = await fetch("./dataRetos.json",{cache:"no-cache"}).then(e=>e.json());
    dataRetos.push(...rest);
    cargaItems(contentRetos,dataRetos,URLretos);
}

// handler Media Querys
function mqHandler() {
    for (let [scr, mq] of Object.entries(screen)) {
      if (!mq || mq.matches) size = scr;
    }
    cargaItems(contentProyects,dataProyects,URLproyects);
    cargaItems(contentRetos,dataRetos,URLretos);
    if (size === "imgLaptop" || size === "imgDesktop"){
        closeAcercade.addEventListener("click",handlerCloseVentana);
        closeHabilidades.addEventListener("click",handlerCloseVentana);
        closeProyectos.addEventListener("click",handlerCloseVentana);
        closeRetos.addEventListener("click",handlerCloseVentana);
    }else{
        closeAcercade.removeEventListener("click",handlerCloseVentana);
        closeHabilidades.addEventListener("click",handlerCloseVentana);
        closeProyectos.addEventListener("click",handlerCloseVentana);
        closeRetos.addEventListener("click",handlerCloseVentana);
    }
}

for (let [scr, mq] of Object.entries(screen)) {
    if (mq) mq.addEventListener('change', mqHandler);
}

function setHora(){
    const currentTime = new Date();
    const h = currentTime.getHours();
    const mm = currentTime.getMinutes();
    hora.innerHTML = h+":"+mm;
}

menu.addEventListener("click",handlerClickMenu);
menuHabilidades.addEventListener("click", changeViewSkills);

leftProyects.addEventListener("click",prevProyects);
rightProyects.addEventListener("click",nextProyects);

leftRetos.addEventListener("click",prevRetos);
rightRetos.addEventListener("click",nextRetos);

mqHandler();
listSkills();
listProyects();
listRetos();
setHora();
setInterval(setHora,10000);