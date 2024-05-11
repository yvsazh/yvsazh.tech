// отримую канвас на початку головної сторінки
const mainCanvas = document.getElementById("projects-canvas");
const mainCtx = mainCanvas.getContext("2d");
// ставлю розміри
mainCanvas.width = window.innerWidth;
mainCanvas.height = 800;

// замальовка канвасу
function renderCanvas(){
	mainCtx.fillStyle = "#121212"
	mainCtx.fillRect(0,0,mainCanvas.width, mainCanvas.height);
}
// створюю об'єкт частинки
function Particle(x, y){
	this.x = x;
	this.y = y;
}
// функція малювання частинки
Particle.prototype.draw = function(){
	mainCtx.fillStyle = "#CACACA"
	mainCtx.beginPath();
	mainCtx.arc(this.x, this.y, 25, 25,  Math.PI*2, true);
	mainCtx.closePath();
	mainCtx.fill();
}
// масив для частинок
let particles = []

// створюю 100 частинок і записую їх у масив
for (let i = 0; i <= 100; i++){
	particles.push(new Particle(Math.floor(Math.random()*mainCanvas.width)-100, Math.floor(Math.random()*900)+800))
}
// функція, що обновляє канвас
function update(){
	// замальовуємо канвас
	renderCanvas();
	// отримуємо кожну частинку
	for(let i = 0; i <= 100; i++){
		// якщо піднімаються надто висото повертаємо назад
		if (particles[i].y < 700){
			particles[i].y = Math.floor(Math.random()*900)+1200
			// інакше з різною швидкістю піднімаємо до верху
		}else{
			particles[i].y -= Math.floor(Math.random()*5);
		}
		// малюємо
		particles[i].draw();
	}
}
// постійно викликаємо функцію update
setInterval(update, 30);


// projects screen
var projects = [
    {name: "Physics LNZ", description: "Створюйте свої фізичні симуляції", id: 0, preview: "physicslnz.jpg", href: "https://physicslnz.pythonanywhere.com", download: false},
    {name: "OnlinePaint", description: "Маленька, простенька онлайн малювалка", id: 1, preview: "onlinePaint.jpg", href: "https://onlinepaint.pythonanywhere.com", download: false},
    {name: "BLS", description: "Міні соц. мережа для фліперів :)", id: 2, preview: "bls.jpg", href: "https://bls.pythonanywhere.com", download: false},
    {name: "My Village Game", description: "Розвивайте своє село, атакуйте інші, захищайтесь!", id: 3, preview: "my-village-game.jpg", href: "https://my-village-game.web.app", download: false},
    {name: "Egra", description: "Експерементуйте з простими графіками", id: 4, preview: "egra.jpg", href: "https://egra.pythonanywhere.com", download: false},
    {name: "NN-easy.info", description: "Експерементуйте з нейромережами", id: 5, preview: "nn-easy.jpg", href: "https://nn-easy.info", download: false},
    {name: "CoolSchool", description: "Веб-сайт для репетитора з англійської мови", id: 6, preview: "coolschool.jpg", href: "https://coolschool.pythonanywhere.com", download: false},
    {name: "Minecraft", description: "Маленький клон майнкрафт. Спробуйте!", id: 7, preview: "minecraft.png", href: "./assets/minecraft.zip", download: true},
    {name: "Live of Die", description: "Зможете зібрати 100 монеток?", id: 8, preview: "liveofdie.jpeg", href: "./assets/liveofdie.zip", download: true},
    {name: "Date of Death", description: "Дізнайтесь дату своєї смерті 😈", id: 9, preview: "DateOfDeath.jpeg", href: "./assets/DateOfDeath.zip", download: true},
    {name: "Міні-платфоремр", description: "Зможете пройти з першого разу?", id: 10, preview: "minigame.jpeg", href: "./assets/minigame.zip", download: true},
    {name: "A.I. експерименти", description: "Протестуйте цікаві експерименти з ШІ!", id: 11, preview: "aiexp.jpg", href: "https://ai-gpt-experiments.web.app/", download: false},
]

var selectedProject = 0;

// init projects in html
for (var project of projects) {
    if (!project.download) {
        $(".screen").append(`
            <a style="display: none;" target="_blank" href="${project.href}" class="${project.id}">
                <div style="background: url('./assets/${project.preview}');background-size: cover;background-position: center;" id="${project.id}">
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                </div>
            </a>
        `);
    } else {
        $(".screen").append(`
            <a style="display: none;" download href="${project.href}" class="${project.id}">
                <div style="background: url('./assets/${project.preview}');background-size: cover;background-position: center;" id="${project.id}">
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                </div>
            </a>
        `);
    }

    if ($(`#${project.id}`).attr("id") == selectedProject) {
        $(`.${project.id}`).attr("style", "");
    }
}

$("#scroll-left").click(function() {
    if (selectedProject-1 < 0) {
        selectedProject = projects.length-1;
    } else {
        selectedProject -= 1;
    }
    for (var project of projects){
        $(`.${project.id}`).attr("class", `${project.id} animated-fadeout`);
        $(`.${project.id}`).attr("style", "display:none;")
        
    }
    $(`.${selectedProject}`).attr("class", `${selectedProject} animated-fadein`);
    $(`.${selectedProject}`).attr("style", "");
});

$("#scroll-right").click(function() {
    if (selectedProject+1 > projects.length-1) {
        selectedProject = 0;
    } else {
        selectedProject += 1;
    }
    for (var project of projects){
        $(`.${project.id}`).attr("class", `${project.id} animated-fadeout`);
        $(`.${project.id}`).attr("style", "display:none;")
        
    }
    $(`.${selectedProject}`).attr("class", `${selectedProject} animated-fadein`);
    $(`.${selectedProject}`).attr("style", "");
});

$(".screen > a > div").hover(function(){ 
    agentId = $(this).attr("id")
    $(`#${agentId} > h2`).css("display", "block")
    $(`#${agentId} > p`).css("display", "block")
}, function(){ 	
    setTimeout(() => {
        agentId = $(this).attr("id")
        $(`#${agentId} > h2`).css("display", "none")
        $(`#${agentId} > p`).css("display", "none")
    }, 450)
});