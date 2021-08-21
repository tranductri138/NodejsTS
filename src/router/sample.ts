import express from 'express';
import controller from '../controllers/sampleController';

const router = express.Router();

router.get('/tris', controller.serverHealthCheck);

export = router;
