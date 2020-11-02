import axiosCliente from "./axios";

const tokenAuth = (token) => {
  if (token) {
    axiosCliente.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axiosCliente.defaults.headers.common["x-auth-token"];
  }
};

export default tokenAuth;

// la fn agrega o elimina un header 'x-auth-token' por default.