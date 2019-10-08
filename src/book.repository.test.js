const BookRepository = require('./book.repository');

describe('Book repository Save', function () {

    test('Save a book', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        repository.save({id: 1, name: "Unit test", price: 11});

        expect(dbMock.write.mock.calls.length).toBe(1);
    });

    test('Save a book with date', () => {

      const dbMock = {
        get : jest.fn().mockReturnThis(),
        push : jest.fn().mockReturnThis(),
        write : jest.fn().mockReturnThis()
      };
      const repository = new BookRepository(dbMock);
      repository.save({id: 1, name: "Unit test", price: 11, added_at: "2019-10-01"});

      expect(dbMock.write.mock.calls.length).toBe(1);
    });

  test('Save an incomplete book', () => {

    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new BookRepository(dbMock);

    expect(() => {repository.save({id: 1, name: "Unit test"})})
      .toThrow('Unable to compute Save of incomplete book');
  });

  test('Save a null book => throw \'Unable to compute Save of null book\'', () => {

    const dbMock = {
      get : jest.fn().mockReturnThis(),
      push : jest.fn().mockReturnThis(),
      write : jest.fn().mockReturnThis()
    };
    const repository = new BookRepository(dbMock);

    expect(() => {repository.save()})
      .toThrow('Unable to compute Save of null book');
  });

  test('Save a empty book => throw \'Unable to compute Save of incomplete book\'', () => {
    const repository = new BookRepository();

    expect(() => {repository.save({})})
      .toThrow('Unable to compute Save of incomplete book');
  });

    test('Get total count', () => {
      const dbMock = {
        get : jest.fn().mockReturnThis(),
        size : jest.fn().mockReturnThis(),
        value: jest.fn().mockReturnValue(10)
      };
      const repository = new BookRepository(dbMock);

      expect(repository.getTotalCount()).toBe(10);
    });

  test('Get total count returns negative value', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      size : jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue(-5)
    };
    const repository = new BookRepository(dbMock);

    expect(() => {repository.getTotalCount()})
      .toThrow('Unable to get total count, size can\'t be negative');
  });

  test('Get total price 7.5 + 9 => 16.5', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
          {id:1, name:"test", price:7.5},
          {id:1, name:"test", price:9}
          ])
    };
    const repository = new BookRepository(dbMock);

    expect(repository.getTotalPrice()).toBe(16.5);
  });

  test('Get total price empty base => 0', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([])
    };
    const repository = new BookRepository(dbMock);

    expect(repository.getTotalPrice())
      .toBe(0);
  });

  test('Get book by name "Harry Potter" => OK', () => {
    const dbMock = {
      get: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id:2, name:"Harry Potter", price:12}
      ])
    };
    const repository = new BookRepository(dbMock);

    expect(repository.getBookByName("Harry Potter"))
      .toEqual([{id: 2, name: "Harry Potter", price: 12}]);

  });

  test('Get book by empty name => throw error', () => {
    const repository = new BookRepository();

    expect(() => {repository.getBookByName("")})
      .toThrow('Unable to search a book without name');
  });

  test('Get book by null name => throw error', () => {
    const repository = new BookRepository();

    expect(() => {repository.getBookByName()})
      .toThrow('Unable to search a book without name');
  });

  test('Get count book added by month', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([
        {id:1, name:"test", price:7.5, added_at:"2019-07-12"},
        {id:1, name:"test", price:9, added_at:"2019-08-01"}
      ])
    };
    const repository = new BookRepository(dbMock);

    expect(repository.getCountBookAddedByMonth()).toEqual(
      [{ year: '2019',
          month: '07',
          count: 1,
          count_cumulative: 1
      },
        { year: '2019',
          month: '08',
          count: 1,
          count_cumulative: 2
        }]);
  });

  test('Get empty count book added by month', () => {
    const dbMock = {
      get : jest.fn().mockReturnThis(),
      value: jest.fn().mockReturnValue([])
    };
    const repository = new BookRepository(dbMock);

    expect(repository.getCountBookAddedByMonth()).toEqual([]);
  });
});
