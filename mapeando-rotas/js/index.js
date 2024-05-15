const routes ={
    "/": "/pages/home.html",
    "/about": "/pages/about.html",
    "/contact": "/pages/contact.html",
    404: "/pages/404.html"
}

function route(event){
    event = event || window.event
    event.preventDefault()

    window.history.pushState({},"", event.target.href)
    handle()
}

function handle(){
    const {pathname} = window.location
    const route = routes[pathname]||routes[404]

    //"promise que buscarei essa rota e quando concluir te mostrarei"
    fetch(route) // fetch busca dados JSON em um servidor para poder linkar com o front-end
    .then((data) => data.text())
    .then(html => {
        document.querySelector('#app').innerHTML = html // busca o html da página
    }) 
    
}

handle()

window.onpopstate = ()=>{
    handle()
}
window.route = () =>{
    route();
} 