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

test('notExists return true for coucou@coucou.fr', () => {
  return user
    .notExists('coucou@coucou.fr')
    .then(bool => expect(bool).toBe(true))
})

test('getByEmail return a user object', () => {
  return user.getByEmail('do@do.do')
  .then( data => expect(data.firstname).toBeDefined())
});

test("getByEmail return an error for fake email", () => {
  return user.getByEmail("fake@do.do").then( data => expect(data).toBe(false))
});

test("getById return a user object", () => {
  return user.getById(1).then(data => {
    return expect(data.firstname).toBeDefined();
  });
});

test("getById return an error for fake ID", () => {
  return user.getById(999).then( data => expect(data).toBe(false))
});

test('createUser insert un user', () => {
  return user.createUser({firstname: 'Alexandra', lastname: 'Leveille', email: 'al@do.do', pwd: 'coucou'})
  .then( data => expect(data.rowCount).toBe(1))
})

afterAll(async () => await require('../models/db').end())