export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)
        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]

        //"promise que buscarei essa rota e quando concluir te mostrarei"
        fetch(route) // fetch busca dados JSON em um servidor para poder linkar com o front-end
            .then((data) => data.text())
            .then(html => {
                document.querySelector('#app').innerHTML = html // busca o html da página
            })

    }

}
