import { API_URL } from "../constants/api_url";
export async function register(fullData:Record<string, unknown>) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fullData),
  });

  if (!res.ok) throw new Error("Failed to register user");
  return res.json();
}
