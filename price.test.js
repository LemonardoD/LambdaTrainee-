#! /usr/bin/env node

let priceCheck = require('./price')


test('Чекаем прайс обработки', () => {
  expect(priceCheck(332,'en')).toBe(144);
});
test('Чекаем прайс обработки c Док тайпом ', () => {
    expect(priceCheck(332,'en', 'doc')).toBe(120);
});
test('Чекаем прайс на Украинском и русском  c Док тайпом ', () => {
    expect(priceCheck(1000,'ua', 'doc')).toBe(50);
});
test('Чекаем прайс на Украинском и русском  c Док тайпом ', () => {
    expect(priceCheck(25000,'ua', 'doc')).toBe(1250);
});
test('Чекаем прайс на Украинском c много букв ', () => {
    expect(priceCheck(25000,'ua')).toBe(1500);
});
test('Чекаем прайс на  русском  без Док тайпа много букв ', () => {
    expect(priceCheck(50000,'ru')).toBe(3000);
});
