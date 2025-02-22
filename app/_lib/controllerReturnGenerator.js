export function successReturn(returned) {
  return {
    success: true,
    errorCode: undefined,
    returned: returned,
  };
}

export function errorReturn(code, returned) {
  return {
    success: false,
    errorCode: code,
    returned: returned,
  };
}
