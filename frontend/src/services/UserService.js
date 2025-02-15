import http from "../http-common";

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/users/${id}`);
};

const create = data => {
  return http.post("/createUser", data);
};

const update = (id, data) => {  
  return http.put(`/user/${id}`, data);
};

const remove = id => {
  return http.delete(`/user/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};


const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll  
};

export default UserService;
