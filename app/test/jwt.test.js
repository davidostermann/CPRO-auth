const { extractBearerToken } = require("../auth/jwt");

test("extractBearerToken extract a good token", () => {
  expect(extractBearerToken("bearer fdfdf$fdfd2323")).toBe("fdfdf$fdfd2323");
  expect(extractBearerToken("Bearer fdfdf$fdfd2323")).toBe("fdfdf$fdfd2323");
  expect(extractBearerToken("Bearer   fdfdf$fdfd2323")).toBe("fdfdf$fdfd2323");
});