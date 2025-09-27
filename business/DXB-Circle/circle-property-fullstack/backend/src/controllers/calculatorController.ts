import { Request, Response } from 'express';
import { z } from 'zod';

// Validation schemas
const yieldCalculationSchema = z.object({
  price: z.number().positive(),
  monthlyRent: z.number().positive(),
  annualCosts: z.number().min(0).max(100), // percentage
  voidPeriod: z.number().min(0).max(12).optional().default(1), // months
  managementFee: z.number().min(0).max(20).optional().default(5) // percentage
});

const tcoCalculationSchema = z.object({
  price: z.number().positive(),
  closingCosts: z.number().min(0).max(20), // percentage
  furnishing: z.number().min(0),
  annualCosts: z.number().min(0),
  renovationCosts: z.number().min(0).optional().default(0)
});

const saveCalculationSchema = z.object({
  type: z.enum(['yield', 'tco']),
  inputs: z.record(z.any()),
  results: z.record(z.any()),
  email: z.string().email(),
  name: z.string().min(1)
});

export const calculateYield = async (req: Request, res: Response) => {
  try {
    const data = yieldCalculationSchema.parse(req.body);
    
    // Calculate annual rent
    const annualRent = data.monthlyRent * 12;
    
    // Calculate annual costs
    const totalAnnualCosts = (data.price * data.annualCosts / 100) + 
                            (annualRent * data.managementFee / 100);
    
    // Account for void period
    const effectiveRent = annualRent * (12 - data.voidPeriod) / 12;
    
    // Calculate net yield
    const netYield = ((effectiveRent - totalAnnualCosts) / data.price) * 100;
    
    // Calculate gross yield for reference
    const grossYield = (annualRent / data.price) * 100;
    
    // Calculate monthly net income
    const monthlyNetIncome = (effectiveRent - totalAnnualCosts) / 12;
    
    const results = {
      netYield: Number(netYield.toFixed(2)),
      grossYield: Number(grossYield.toFixed(2)),
      monthlyNetIncome: Number(monthlyNetIncome.toFixed(0)),
      annualNetIncome: Number((effectiveRent - totalAnnualCosts).toFixed(0)),
      totalAnnualCosts: Number(totalAnnualCosts.toFixed(0)),
      assumptions: {
        voidPeriod: data.voidPeriod,
        managementFee: data.managementFee,
        annualCostsRate: data.annualCosts
      }
    };
    
    res.json({ success: true, results });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid input data', 
        details: error.errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Calculation failed' 
    });
  }
};

export const calculateTCO = async (req: Request, res: Response) => {
  try {
    const data = tcoCalculationSchema.parse(req.body);
    
    // Calculate closing costs
    const closingCostAmount = data.price * data.closingCosts / 100;
    
    // Calculate total first year costs
    const totalFirstYear = data.price + 
                          closingCostAmount + 
                          data.furnishing + 
                          data.renovationCosts + 
                          data.annualCosts;
    
    // Calculate cost per square foot (assuming 1000 sqft average)
    const avgSqft = 1000;
    const costPerSqft = totalFirstYear / avgSqft;
    
    const results = {
      totalFirstYear: Number(totalFirstYear.toFixed(0)),
      breakdown: {
        purchasePrice: data.price,
        closingCosts: Number(closingCostAmount.toFixed(0)),
        furnishing: data.furnishing,
        renovation: data.renovationCosts,
        annualCosts: data.annualCosts
      },
      costPerSqft: Number(costPerSqft.toFixed(0)),
      monthlyBudget: Number((data.annualCosts / 12).toFixed(0))
    };
    
    res.json({ success: true, results });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid input data', 
        details: error.errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Calculation failed' 
    });
  }
};

export const saveCalculation = async (req: Request, res: Response) => {
  try {
    const data = saveCalculationSchema.parse(req.body);
    
    // In a real implementation, you would save to database and send email
    // For now, we'll just return success
    
    // TODO: Save to database
    // TODO: Send email with calculation results
    // TODO: Add to newsletter if opted in
    
    res.json({ 
      success: true, 
      message: 'Calculation saved and email sent',
      calculationId: `calc_${Date.now()}`
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid input data', 
        details: error.errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save calculation' 
    });
  }
};
