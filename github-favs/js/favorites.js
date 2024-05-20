export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
    }

}

export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
    }


    update(){
        //remove todas as linhas da tabela
       this.removeAllTr();
    }

    removeAllTr(){

         //selecionando a tabela
         const tbody = this.root.querySelector('table tbody')
         //pegando todas as linhas
         tbody.querySelectorAll('tr')
         .forEach((tr) => {
             //remove cada elemento da lista
             tr.remove()
             
         });

    }
}