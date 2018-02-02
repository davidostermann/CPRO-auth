const { checkCredentials } = require("../auth/login");

test("checkCredentials return a USER for good credentials", () => {
  return checkCredentials("do@do.do", "bacon").then(data =>
    expect(data.firstname).toBeDefined()
  );
});

test("checkCredentials reject 'bad email' for bad email", () => {
  expect.assertions(1); // pas d'assertion => on n'est pas passé dans le catch
  return checkCredentials("baddo@do.do", "bacon").catch(err =>
    expect(err.error).toBe("bad email")
  );
  // OU
  //return expect(checkCredentials("do@do.do", "bacon")).rejects.toEqual({error: 'bad email'})
});

test("checkCredentials reject 'bad password' for bad password", () => {
  expect.assertions(1); // pas d'assertion => on n'est pas passé dans le catch
  return checkCredentials("do@do.do", "badbacon").catch(err =>
    expect(err.error).toBe("bad password")
  );
  // OU
  //return expect(checkCredentials("do@do.do", "badbacon")).rejects.toEqual({error: 'bad password'});
});

afterAll( async () => await require('../models/db').end())

// REF : https://facebook.github.io/jest/docs/en/tutorial-async.html
