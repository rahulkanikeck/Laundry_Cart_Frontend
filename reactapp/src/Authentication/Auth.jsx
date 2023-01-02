import React from "react";

function setToken(token, value) {
  localStorage.setItem(token, value);
}
function getToken(token) {
  return localStorage.getItem(token);
}
function removeToken(token) {
  localStorage.clear();
}
export { setToken, getToken, removeToken };
