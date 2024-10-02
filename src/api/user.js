import {addHeaders, get, post} from "../utils/api/api";
import storage from "../utils/storage";
import {v4 as getUUID} from "uuid";

const uuidStorage = storage("user-uuid");
let uuid = uuidStorage.load();

export function login(data) {
  return post("/user/auth", data)
    .then(saveAuth)
}

export function signup(data) {
  return post("/user/signup", data)
    .then(saveAuth)
}

export function update(data) {
  return post("/user/update", data)
}

export function profile() {
  return post("/user/profile", {hash: uuid})
    .then(saveAuth);
}

export async function logout() {
  return saveAuth(false);
}

export function skipLogin() {
  if (typeof uuid !== "string") {
    uuid = getUUID();
    uuidStorage.save(uuid);
  }
  return login({hash: uuid});
}

function saveAuth(data) {
  const token = data?.profile?.access_token;
  addHeaders({
    "Authorization": token ? `Bearer ${token}` : false
  });

  return data;
}

