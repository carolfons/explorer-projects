export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load();
    }

    //carregamento dos dados
    load() {
        //dados
        this.entries = [{
            login: "carolfons",
            name: "Caroline Fonseca",
            public_repos: "37",
            followers: "120",
        }
        ]
    }

}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        //selecionando a tabela
        this.tbody = this.root.querySelector('table tbody')
        this.update();
    }


    update() {
        //remove todas as linhas da tabela
        this.removeAllTr();

        this.entries.forEach(user => {
            //criando a linha
            const row = this.createRow();
            //colocando as informações do usuário
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Image of ${user.name}`;
            row.querySelector('.user p').textContent = user.name;
            row.querySelector('.user span').textContent = user.login;
            row.querySelector('.repositories').textContent = user.public_repos;
            row.querySelector('.followers').textContent = user.followers;
            this.tbody.append(row)
        });

    }

    removeAllTr() {
        //pegando todas as linhas
        this.tbody.querySelectorAll('tr')
            .forEach((tr) => {
                //remove cada elemento da lista
                tr.remove()

            });

    }

    createRow() {
        // criando um elemento tr
        const tr = document.createElement('tr');

        // selecionando o conteúdo dentro da tr
        const content = `<td class="user">
                         <img src="https://github.com/carolfons.png" alt="">
                         <a href="https://github.com/carolfons" target="_blank">
                             <p>Caroline Fonseca</p>
                             <span>carolfons</span>
                         </a>
                     </td>
                     <td class="repositories">37</td>
                     <td class="followers">100</td>
                     <td><button class="remove">&times;</button></td>`;

        //colocando o conteúdo dentro do elemento html criado no js
        tr.innerHTML = content;
        return tr;

    }
}