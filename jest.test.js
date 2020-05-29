// 一个用例。每个用例测试一个独立的功能点
// 第一个参数为用例的名称，第二个是用例的逻辑，一个回调函数
test('test common matcher', () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})
test('test object', () => {
  // toBe 是完全相同 toEqual 是值相同
  expect({name: 'jiegiser'}).toEqual({name: 'jiegiser'})
})