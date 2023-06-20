import {IEnv} from '../interfaces/IEnv';

export const ENV:IEnv = {
    port:8010,
    apiPath: '/api/v1',
    staticPath: 'public',
    domain:'',
    db:{
        name: 'assignement',
        user:'vmuser',
        pw: 'vmus3r',
        account: 'my-vm',
        uri: (user: string, pw :string, name :string, account: string) => {
            return `mongodb+srv://${user}:${pw}@${account}.ksfkwty.mongodb.net/${name}?retryWrites=true&w=majority`
        }
    },
}