export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return Boolean(token);
}
export function logout() {
  localStorage.removeItem("token");
}

export function getUserId() {
  const token = localStorage.getItem("token");
  console.log("TOKEN =", token);

  if (!token) {
    console.log("NO TOKEN FOUND");
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("DECODED PAYLOAD =", payload);
    console.log("PAYLOAD TYPE =", typeof payload);

    return payload.id;
  } catch (e) {
    console.log("FAILED TO PARSE TOKEN", e);
    return null;
  }
}
