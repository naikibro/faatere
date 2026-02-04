export interface ITomite {
  id: string;
  code: string; // Short code (e.g., "PPT" for Papeete)
  name: string; // Full name
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}
