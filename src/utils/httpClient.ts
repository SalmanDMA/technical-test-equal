import { ApiResponse } from "../types/ApiResponse";
import Cookies from "js-cookie";
import { decryptedData } from "./encryptedData";

interface HttpClientParam {
  method: string;
  endpoint?: string;
  payload?: any;
  type?: string;
}

const httpClient = async ({
  method,
  endpoint,
  payload,
  type,
}: HttpClientParam): Promise<ApiResponse> => {
  const accessToken = Cookies.get("access") ?? null;
  const decrypted = accessToken && (await decryptedData(accessToken || ""));
  const parseDecrypted = decrypted && JSON.parse(decrypted);
  const url = `${import.meta.env.VITE_BASE_URL}${endpoint}`;

  const headers: any = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization =
      parseDecrypted.token_type + " " + parseDecrypted.access_token;
  }

  if (type === "multipart") {
    headers["Content-Type"] = "multipart/form-data";
  }

  try {
    let response;

    switch (method.toLowerCase()) {
      case "get":
        response = await fetch(url, {
          method: "GET",
          headers,
        });
        break;

      case "post":
        response = await fetch(url, {
          method: "POST",
          headers,
          body: payload,
        });
        break;

      case "put":
        response = await fetch(url, {
          method: "PUT",
          headers,
          body: payload,
        });
        break;

      case "delete":
        response = await fetch(url, {
          method: "DELETE",
          headers,
        });
        break;

      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export default httpClient;
