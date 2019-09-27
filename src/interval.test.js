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
    const interv2 = new Interval(15, 20);
    expect(interv1.overlaps(interv2)).toBe(false);
  });

  test('Interval1 includes interval2 => true', () => {
    const interv1 = new Interval(1, 15);
    const interv2 = new Interval(5, 10);
    expect(interv1.includes(interv2)).toBe(true);
  });

  test('interval1 equals interval2 => true', () => {
    const interv1 = new Interval(1, 15);
    const interv2 = new Interval(1, 15);
    expect(interv1.includes(interv2)).toBe(true);
  });

  test('interval1 don\'t includes interval2 => false', () => {
    const interv1 = new Interval(5, 8);
    const interv2 = new Interval(5, 10);
    expect(interv1.includes(interv2)).toBe(false);
  });

  test('Union interval1 [5,8] overlapse interval2 [3,6] => [3,8]', () => {
    const interv1 = new Interval(5, 8);
    const interv2 = new Interval(3, 6);

    const expected = [new Interval(3, 8)];
    expect(interv1.union(interv2)).toHaveLength(1);
    expect(interv1.union(interv2)).toEqual(expected);
  });

  test('Union interval1 [5,8] no overlapse interval2 [10,20] => [5,8],[10,20]', () => {
    const interv1 = new Interval(5, 8);
    const interv2 = new Interval(10, 20);

    const expected = [new Interval(5, 8), new Interval(10, 20)];
    expect(interv1.union(interv2)).toHaveLength(2);
    expect(interv1.union(interv2)).toEqual(expected);
  });
});
