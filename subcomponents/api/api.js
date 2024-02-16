import { useRouter } from "next/navigation";

const API_URL = process.env.backendURL;

const API = () => {
  const router = useRouter();

  async function crud(requestMethod, endpoint, data, isFormdata) {
    const token = localStorage.getItem("jwtToken");

    var requestOptions = isFormdata
      ? {
          method: requestMethod,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data ? data : null,
        }
      : {
          method: requestMethod,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: data ? JSON.stringify(data) : null,
        };

    if (data instanceof Object) {
      requestOptions.body = data;
    }

    try {
      const response = await fetch(API_URL + endpoint + "/", requestOptions);

      if (response.status === 401) {
        router.push("/login");
        throw "Login required";
      }

      if (
        requestMethod === "DELETE" &&
        response.status >= 200 &&
        response.status <= 299
      ) {
        refreshToken();
        return true;
      }
      const responseData = await response.json();
      if (responseData["status"]) {
        responseData["modelStatus"] = responseData["status"];
      }
      responseData["status"] = response.status;
      // refreshToken();
      return responseData;
    } catch (error) {
      console.error("API call error:", error);
      throw error;
    }
  }

  async function getToken(data) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(API_URL + "token/", requestOptions);
      const responseData = await response.json();

      if (
        responseData["detail"] &&
        responseData["detail"] ===
          "No active account found with the given credentials"
      ) {
        return { error: "Invalid credentials." };
      } else {
        localStorage.setItem("jwtToken", responseData.access);
        localStorage.setItem("jwtRefresh", responseData.refresh);
        const currentTime = new Date().getTime();
        localStorage.setItem("lastRefresh", currentTime.toString());
        return responseData;
      }
    } catch (error) {
      console.log("API call error:", error);
      throw error;
    }
  }

  async function refreshToken() {
    const lastTime = localStorage.getItem("lastRefresh");

    if (lastTime) {
      const refreshTime = 30; // time in minutes
      const currentTime = new Date().getTime();
      const refreshTimeInMillis = refreshTime * 60 * 1000;
      const elapsedTime = currentTime - parseInt(lastTime);

      if (elapsedTime < refreshTimeInMillis) {
        return;
      }
    }

    const refreshKey = localStorage.getItem("jwtRefresh");
    const data = { refresh: refreshKey };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(API_URL + "token/refresh/", requestOptions);
      const responseData = await response.json();
      console.log(responseData);
      if (responseData["access"]) {
        localStorage.setItem("jwtToken", responseData.access);
        const currentTime = new Date().getTime();
        localStorage.setItem("lastRefresh", currentTime.toString());
        return true;
      } else {
        localStorage.setItem("jwtToken", null);
        localStorage.setItem("jwtRefresh", null);
        return false;
      }
    } catch (error) {
      console.log("API call error:", error);
      return false;
    }
  }

  async function register(method, endpoint, data) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(API_URL + endpoint, requestOptions);
      const responseData = await response.json();
      console.log(response);
      // if (responseData["access"]) {
      //   localStorage.setItem("jwtToken", responseData.access);
      //   const currentTime = new Date().getTime();
      //   localStorage.setItem("lastRefresh", currentTime.toString());
      //   return true;
      // } else {
      //   localStorage.setItem("jwtToken", null);
      //   localStorage.setItem("jwtRefresh", null);
      //   return false;
      // }
    } catch (error) {
      console.log("API call error:", error);
      return false;
    }
  }

  return {
    crud,
    getToken,
    refreshToken,
    register,
  };
};

export default API;
