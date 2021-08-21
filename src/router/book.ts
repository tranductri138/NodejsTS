import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.get('/book/:id', controller.getBookById);
router.post('/create/book', controller.createBook);
router.post('/update/book', controller.updateBook);
router.get('/get/books', controller.getAllBooks);
router.delete('/del/:id', controller.deleteBookById);
router.get('/search/book', controller.searchBook);

export = router;
