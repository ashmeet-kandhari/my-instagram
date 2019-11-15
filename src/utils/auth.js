import axios from "axios";

export const userService = {
  login,
  logout
};

async function login(username, password, callBackFunction) {
  const data = { username, password };

  const response = await axios
    .post(`/api/users/login`, data)
    .then(res => {
      // login successful if there's a user in the response
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("user-token", token);
        const payload = getJWTPayload(token);
        if (callBackFunction) {
          return callBackFunction(payload.data);
        }
        return payload.data;
      }
    })
    .catch(error => {
      console.log(error);
    });

  return response;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

const getJWTPayload = token => {
  const base64Url = token.split(".")[1];
  const base64 = decodeURIComponent(
    atob(base64Url)
      .split("")
      .map(c => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(base64);
};
