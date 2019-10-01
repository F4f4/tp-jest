const lodashId = require('lodash-id');

class BookRepository {

    /**
     * @param db
     */
    constructor(db) {
        this.db = db;
    }

  /**
   * Sauvegarde le book en BD
   * @param book
   */
  save (book) {
      if(book) {
        if (book.name && book.price) {
          let today = new Date().toISOString().slice(0, 10);
          this.db.get('books')
            .push({
              id: book.id,
              name: book.name,
              price: book.price,
              added_at: book.added_at ? book.added_at : today
            })
            .write();
          // Test avec generation auto des id
          /*lodashId.insert(
            'books',
            {
              name: book.name,
              price: book.price,
              added_at: book.added_at ? book.added_at : today
            }
          );*/
        }else {
          throw 'Unable to compute Save of incomplete book';
        }
      } else {
        throw 'Unable to compute Save of null book';
      }
    }

    /**
     * Retourne le nombre total de livre
     *
     * @returns {Number}
     */
    getTotalCount() {
      let count = this.db.get('books').size().value();
      if (count < 0) throw 'Unable to get total count, size can\'t be negative';

      return count;
    }

    /**
     * Somme du prix de tous les livre
     */
    getTotalPrice() {
      let totalPrice = 0;
      this.db.get('books').value().forEach(book => {
        totalPrice += book.price
      });
      return totalPrice;
    }


    /**
     * Retourne un livre
     */
    getBookByName(bookName) {
      if(bookName) {
        return this.db.get('books')
          .find(({name: bookName}))
          .value();
      } else {
        throw 'Unable to search a book without name';
      }
    }

    /**
     * Nombre de livre ajouté par mois
     *
     *  [
     *      {
     *          year: 2017,
     *          month, 2,
     *          count, 129,
     *          count_cumulative: 129
     *      },
     *      {
     *          year: 2017,
     *          month, 3,
     *          count, 200,
     *          count_cumulative: 329
     *      },
     *      ....
     *  ]
     */
    getCountBookAddedByMont(bookName) {

    }

}


module.exports = BookRepository;
