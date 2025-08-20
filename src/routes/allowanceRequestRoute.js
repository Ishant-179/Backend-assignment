import express from 'express';
import {
  createRequest,
  getRequests,
  updateRequestStatus,
  deleteRequest
} from '../controller/AllowanceRequestController.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.patch('/:id/status', updateRequestStatus);
router.delete('/:id', deleteRequest);

export default router;
