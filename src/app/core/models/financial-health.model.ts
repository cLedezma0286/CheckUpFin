import { FinancialHealthItem } from './financial-health-item.model'
export class FinancialHealth{
  Ahorro: FinancialHealthItem = new FinancialHealthItem();
  Deuda: FinancialHealthItem = new FinancialHealthItem();
  Gastos: FinancialHealthItem = new FinancialHealthItem();
  Plan: FinancialHealthItem = new FinancialHealthItem();
  cliente: string;
  created_at: string;
  entrevista_id: number;
  id: number;
  puntuacion: string;
  updated_at: string
}