const { encode, compare } = require("../auth/pwd");

test('PWD encode', () => {
  return encode('coucou')
  .then( hash => expect(hash).toBeDefined() )
})

test("PWD encode empty password generate error", () => {
  return encode()
  .then( t => console.log('t : ', t))
  .catch(err => { 
    return expect(err).toBeDefined()
  });
});

// promise style
test("PWD compare true", () => {
  return encode("coucou")
    .then(hash => compare("coucou", hash))
    .then(isMatch => expect(isMatch).toBe(true));
})

// async await style
// test('PWD compare true', async () => {
//   const hash = await encode('coucou')
//   const isMatch = await compare('coucou', hash)
//   expect(isMatch).toBe(true)
// })

test("PWD compare false", () => {
  return encode("coucou")
    .then(hash => compare("kiki", hash))
    .then(isMatch => expect(isMatch).toBe(false))
});