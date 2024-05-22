import { GithubUser } from "./GithubUser.js";
// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load();
    }

    //carregamento dos dados
    load() {

        //dados dos usuários do github salvos em um array
        this.entries = JSON.parse(localStorage
            .getItem('@github-favorites:')) || []

    }

    //função para salvar dados no local Storage
    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries)) // transforma um array de objetos em string e salva na local storage
    }
// código assíncrono
//essa função sendo assíncrona virou uma promise
    async add(username){
        try{
            //verificar antes de ir pro github se o usuário ja existe na lista
            const userExists = this.entries.find(entry => entry.login === username)
            console.log(userExists)
            if(userExists){
                throw new Error('User already added!')
            }
            //consultando no github o usuário digitado
            const user = await GithubUser.search(username)

            if(user.login === undefined){
                throw new Error('User not found!');
            }

            //this.entries.push(user); =>  quebra a imutabilidade

            this.entries = [user, ...this.entries];
            this.update()
            this.save()

        }catch(error){
            alert(error.message)
               
        }
    }

    delete(user) {
        // se o usuario selecionado for == ao user.login 
        //então o retorno é false 
        const filteredEntries = this.entries
            .filter(entry => entry.login != user.login)

        //colocando um novo array e atualizado sem o usuário que foi deletado
        //reatribuição de um novo array - principio da imutabilidade
        this.entries = filteredEntries;
        this.update()
        this.save()
    }

}

// classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        //selecionando a tabela
        this.tbody = this.root.querySelector('table tbody')
        this.update();
        this.onAdd();
    }

    onAdd(){
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = ()=>{
            const {value} = this.root.querySelector('.search input');
            this.add(value)

        }
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
            row.querySelector('.user a').href = `https://github.com/${user.login}`;
            row.querySelector('.user p').textContent = user.name;
            row.querySelector('.user span').textContent = user.login;
            row.querySelector('.repositories').textContent = user.public_repos;
            row.querySelector('.followers').textContent = user.followers;


            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('R U Sure?')
                if (isOk) {
                    this.delete(user)
                }
            }
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