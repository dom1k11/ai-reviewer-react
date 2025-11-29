export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return Boolean(token);
}
export function logout() {
  localStorage.removeItem("token");
}