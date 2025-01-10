import { expect, test } from "vitest";
import { countBytes, formatBytes } from "./utils";

test("countBytes counts bytes in a string", () => {
  expect(countBytes("abc")).toBe(3);
  expect(countBytes("👪🏽")).toBe(8);
  expect(countBytes("żołądź")).toBe(10);
});

test("formatBytes formats bytes", () => {
  expect(formatBytes(0)).toBe("0 bytes");
  expect(formatBytes(1)).toBe("1 byte");
  expect(formatBytes(2)).toBe("2 bytes");

  expect(formatBytes(1500)).toBe("1.5 KB");
  expect(formatBytes(1500, 1000)).toBe("1.5 KB");
  expect(formatBytes(1500, 1024)).toBe("1.46 KiB");

  expect(formatBytes(1_000_000)).toBe("1 MB");
  expect(formatBytes(1_000_000, 1000)).toBe("1 MB");
  expect(formatBytes(1_048_576, 1024)).toBe("1 MiB");

  expect(formatBytes(1_234_567)).toBe("1.23 MB");
  expect(formatBytes(1_234_567, 1000, 5)).toBe("1.23457 MB");
  expect(formatBytes(1_234_567, 1000, 10)).toBe("1.234567 MB");
});
