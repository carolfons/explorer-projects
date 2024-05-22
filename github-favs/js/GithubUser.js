// fetching data from github api

export class GithubUser {
    static search(username) {
        //busca na api
        const endpoint = `https://api.github.com/users/${username}`
        return fetch(endpoint)
            .then(data => data.json()) //transforma em json
            .then(({ login, name, public_repos, followers }) => ({ //retorna apenas os dados que vai precisar
                    
                        login,
                        name,
                        public_repos,
                        followers
                    
                }))
    }
}