import {get, post} from "@/utils/api/api";

export async function getData() {
   return get('https://jsonplaceholder.typicode.com/todos');
}
export async function submit(data) {
    return post('https://dummyjson.com/auth/login',data);
}
