const user = require('../models/user') 

test("getUsers results is defined", () => {
  return user.getUsers().then(results => expect(results).toBeDefined());
});

test("getUsers has at least one item", () => {
  return user
    .getUsers()
    .then(results => expect(results.length).toBeGreaterThan(0));
});

test("getUsers return an array", () => {
  return user
    .getUsers()
    .then(results => expect(Array.isArray(results)).toBe(true));
});

test('noExists return true for coucou@coucou.fr', () => {
  return user.noExists('coucou@coucou.fr').then(
    bool => expect(bool).toBe(true)
  );
})

test('getUserByEmail return a user object', () => {
  return user.getUserByEmail('do@do.do')
  .then( data => expect(data.firstname).toBeDefined())
});

test("getUserByEmail return an error for fake email", () => {
  return user.getUserByEmail("fake@do.do").then( data => expect(data).toBe(false))
});

test("getUserById return a user object", () => {
  return user.getUserById(1).then(data => {
    return expect(data.firstname).toBeDefined();
  });
});

test("getUserById return an error for fake ID", () => {
  return user.getUserById(999).then( data => expect(data).toBe(false))
});

test('createUser insert un user', () => {
  return user.createUser({firstname: 'Alexandra', lastname: 'Leveille', email: 'al@do.do', password: 'coucou'})
  .then( data => expect(data.rowCount).toBe(1))
})