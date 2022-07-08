let totalReturn = require('./total')


test('Возвращяемое время ', () => {
  expect(totalReturn(332,'en')).toBe(72);
});
test('Возвращяемое время ', () => {
    expect(totalReturn(332,'en', 'doc')).toBe(60);
});
test('Возвращяемое время ', () => {
    expect(totalReturn(1000,'ua', 'doc')).toBe(60);
});
test('Возвращяемое время ', () => {
    expect(totalReturn(25000,'ua', 'doc')).toBe(1155.28);
});
test('Возвращяемое время ', () => {
    expect(totalReturn(25000,'ua')).toBe(1386.34);
});
test('Возвращяемое время ', () => {
    expect(totalReturn(32123213,'ru')).toBe(1735123.27);
});test('Возвращяемое время ', () => {
    expect(totalReturn(34324324233,'ua')).toBe(1853977038.83);
});
test('Возвращяемое время ', () => {
    expect(totalReturn(232132,'ru')).toBe(12574.26);
});test('Возвращяемое время ', () => {
    expect(totalReturn(568999888,'ua')).toBe(30733713.37);
});
test('Возвращяемое время ', () => {
    expect(totalReturn(9999999999,'ru')).toBe(540135069.7);
});
