const Interval = require('./interval');

describe('Interval', () => {
  test('Test Interval constructor', () => {
    const interv = new Interval(1, 2);
    expect(interv.start).toBe(1);
    expect(interv.end).toBe(2);
  });

  test('Test toString interval => [1,10]', () => {
    const interv1 = new Interval(1,10);
    expect(interv1.toString()).toBe('[1,10]');
  });

  test('Test overlapsed intervals => true', () => {
    const interv1 = new Interval(1, 10);
    const interv2 = new Interval(5, 15);
    expect(interv1.overlaps(interv2)).toBe(true);
  });

  test('Test non overlapsed intervals => false', () => {
    const interv1 = new Interval(1, 10);
    const interv2 = new Interval((15, 20));
    expect(interv1.overlaps(interv2)).toBe(false);
  });
});
