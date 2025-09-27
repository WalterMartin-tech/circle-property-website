import express from 'express';
import { calculateYield, calculateTCO, saveCalculation } from '../controllers/calculatorController';

const router = express.Router();

// POST /api/calculators/yield
router.post('/yield', calculateYield);

// POST /api/calculators/tco
router.post('/tco', calculateTCO);

// POST /api/calculators/save
router.post('/save', saveCalculation);

export default router;
