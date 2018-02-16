const { encode, compare } = require("../auth/pwd");

test('PWD encode', () => {
  return encode('coucou')
  .then( hash => expect(hash).toBeDefined() )
})

test("PWD encode empty password generate error", () => {
  return encode()
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

const baconHashed =
  '$2a$05$d7uK3TP/zyM2CMCKJ/DnBesHYWyEnVvxzgWxULKKA0tAtcb/Unqma'

test('encoded hash is defined', () => {
  return encode('bacon').then(hash => {
    return expect(hash).toBeDefined()
  })
})

test('compare return true for bacon', () => {
  return compare('bacon', baconHashed).then(bool => {
    return expect(bool).toBe(true)
  })
})

test('compare return false for baaaacon', () => {
  return compare('baaaacon', baconHashed).then(bool => {
    return expect(bool).toBe(false)
  })
})