import {
  AUTHENTICATION_ERROR_401,
  AUTHORIZATION_ERROR_403,
  DUPLICATED_ENTRY_409,
  NETWORK_ERROR,
  SERVER_ERROR_500,
} from "./api";

export default async function apiHelper(
  request,
  toast = (f) => f,
  onFail = (f) => f
) {
  let res = await request();
  // console.log(res);
  if (res.hasOwnProperty("errorCode")) {
    switch (res.errorCode) {
      case NETWORK_ERROR:
        toast.error("Server Possibly Down!");
        return null;
      case AUTHORIZATION_ERROR_403:
        toast.error("Login First!");
        onFail();
        return null;
      case AUTHENTICATION_ERROR_401:
        toast.error("Check Credentials!");
        onFail();
        return null;
      case SERVER_ERROR_500:
        toast.error("Internal Error!");
        return null;
      case DUPLICATED_ENTRY_409:
        toast.error("Duplicated Entry!");
        return null;
    }
  } else {
    return res.data;
  }
}
