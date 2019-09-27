const BookRepository = require('./book.repository');

describe('Book repository Save', function () {

    test('Save a book', () => {

        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        repository.save({id: 1, name: "Unit test"});

        expect(dbMock.write.mock.calls.length).toBe(1);
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

    expect(() => {repository.getTotalCount()}).toThrow('Unable to get total count, size can\'t be negative');
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

    expect(repository.getTotalPrice()).toBe(0);
  });
});
