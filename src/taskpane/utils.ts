export const countBytes = (string: string) => {
  const textEncoder = new TextEncoder();
  const bytes = textEncoder.encode(string).length;

  return bytes;
};

export const formatBytes = (bytes = 0, k: 1000 | 1024 = 1000, decimals = 2) => {
  if (bytes == 0) return "0 bytes";
  if (bytes == 1) return "1 byte";

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizes =
    k === 1000
      ? ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};
