import express from 'express';
import { 
  requestConsultation, 
  getConsultations, 
  updateConsultationStatus 
} from '../controllers/consultationController';

const router = express.Router();

// POST /api/consultations/request
router.post('/request', requestConsultation);

// GET /api/consultations
router.get('/', getConsultations);

// PATCH /api/consultations/:id
router.patch('/:id', updateConsultationStatus);

export default router;
