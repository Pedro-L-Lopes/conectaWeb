export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:7282/";

export const requestConfig = (
  method: string,
  data: any = null,
  token: string | null = null,
  image: any = null
): RequestInit => {
  let config: RequestInit = {
    method,
    headers: {},
  };

  if (image) {
    (config as any).body = data;
  } else if (method !== "DELETE" && data !== null) {
    (config as any).body = JSON.stringify(data);
    (config.headers as any) = { "Content-Type": "application/json" };
  }

  if (token) {
    (config.headers as any) = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};

export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  data: any = null,
  token: string | null = null,
  image: any = null
) => {
  const config = requestConfig(method, data, token, image);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao processar a solicitação");
  }

  return response.json();
};
