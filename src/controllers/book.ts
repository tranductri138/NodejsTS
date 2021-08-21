import { NextFunction, query, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import RequestDto from '../models/reqbody';

const NAMESPACE = 'Books';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting books');

    // let { author, title } = req.body;
    let author = req.body.author;
    let title = req.body.title;
    logging.info(NAMESPACE, 'check request body', req.body);

    let query = `INSERT INTO books (author, title) VALUES ("${author}", "${title}")`;

    let requestDto = new RequestDto(author, title);

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Book created: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(404).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(404).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all books.');

    let query = 'SELECT * FROM books';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};
const getBookById = (req: Request, res: Response) => {
    let id = req.params.id;
    let idX: number = +id;
    let query = `select * from books where id = ${idX} `;
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Get book by id: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

// const checkBook = (id: number):string => {
//     let ok:string ="";
//     let query = `select id books where id = "${id}"`;
//     Connect().then((connection) => {
//         Query(connection, query).then((results) => {
//             logging.info(NAMESPACE, 'here checkkk boook', results);
//             results
//             return true;
//         });
//     });
//     return ok
// };
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting books');

    // let { author, title } = req.body;
    let author = req.body.author;
    let title = req.body.title;
    let id = req.body.id;
    let idx: number = +id;
    logging.info(NAMESPACE, 'check request body', req.body);

    // let query = `INSERT INTO books (author, title) VALUES ("${author}", "${title}")`;
    let query = `update books set author = "${author}" , title = "${title}" where id = "${idx}"`;
    let requestDto = new RequestDto(author, title);
    // if (checkBook(idx) == "oke") {
    //     return res.status(404).json({
    //         message: 'author or title not found'
    //     });
    // }
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Book update: ', result);
                    return res.status(200).json({
                        // result
                        message: 'update succes'
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(404).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(404).json({
                message: error.message,
                error
            });
        });
};
const deleteBookById = (req: Request, res: Response) => {
    let id = req.params.id;
    let idX: number = +id;
    let query = `delete from books where id = "${idX}" `;
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        message: 'delete succes'
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const searchBook = (req: Request, res: Response) => {
    let author = req.query.name;
    let page = req.query.page;
    let pageO = pageRequest(Number(page));
    let type = req.query.type;
    // let query = `select * from books where id = "${idX}" `;
    let query = `select * from books  where author like "%${author}%" order by ${type} limit 2 offset ${pageO}`;
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

function pageRequest(page: number): number {
    let offset: number = (page - 1) * 2;
    return offset;
}
// function pageMax()

export default { createBook, getAllBooks, getBookById, updateBook, deleteBookById, searchBook };
