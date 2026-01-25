/**
 * @description IP 주소 형식인지 확인 (IPv4, IPv6)
 */
export const isIPAddress = (hostname: string) => {
  // IPv4 형식 확인
  const ipv4Pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  if (ipv4Pattern.test(hostname)) {
    return true;
  }

  // IPv6 형식 확인
  // ex) ::1, fe80::1, 2001:db8::1
  const ipv6Pattern = /^([0-9a-f]{0,4}:){2,7}[0-9a-f]{0,4}$/i;
  if (ipv6Pattern.test(hostname)) {
    return true;
  }

  // 축약된 IPv6 (::)
  if (hostname === "::" || hostname.includes("::")) {
    return true;
  }

  return false;
};

/**
 * @description localhost 관련 호스트명인지 확인
 */
export const isLocalhostHostname = (hostname: string) => {
  const lowercaseHostname = hostname.toLowerCase();
  return lowercaseHostname === "localhost" || lowercaseHostname.endsWith(".localhost");
};
