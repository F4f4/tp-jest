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
        this.db.get('books').push(book).write();
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

    }


    /**
     * Retourne un livre
     */
    getBookByName(bookName) {

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
