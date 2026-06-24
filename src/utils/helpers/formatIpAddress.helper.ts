export const formatIpAddress = (ip: string | null | undefined): string => {
  if (!ip) return 'N/A';

  // Xử lý IPv4-mapped IPv6 address (::ffff:192.168.1.1)
  const ipv4MappedMatch = ip.match(
    /^::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/i
  );
  if (ipv4MappedMatch) {
    return ipv4MappedMatch[1];
  }

  // Xử lý localhost variants
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    return '127.0.0.1 (localhost)';
  }

  return ip;
};
