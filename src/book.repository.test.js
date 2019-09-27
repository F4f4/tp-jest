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

});
