import { getSession } from "next-auth/react";

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const session = await getSession();
  if (!session || !session.user?._id) {
    throw new Error("User not authenticated");
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${session.user._id}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
};
