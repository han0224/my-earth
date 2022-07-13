import axios from "axios";
import { config } from "../config";

const URL = config.URL + "user/";

export const login = async (email: string, password: string) => {
  try {
    const result = await axios.post(
      URL + "login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    console.log("!!!!!!!!!!!!", result.status);
    if (result.status === 200) {
      return { success: true, data: result.data };
    } else {
      return { success: false, message: "다시 한번 입력해 주세요" };
    }
  } catch (e) {
    return { success: false, message: "다시 한번 입력해 주세요" };
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const result = await axios.post(
      URL + "register",
      {
        name: name,
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    if (result.status === 204) {
      return result;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const auth = async () => {
  try {
    const result = await axios.get(URL + "auth", {
      withCredentials: true,
    });
    if (result.status === 200) {
      return result.data;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const logout = async () => {
  try {
    const result = await axios.get(URL + "logout", {
      withCredentials: true,
    });
    if (result.status === 200) {
      return result;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
