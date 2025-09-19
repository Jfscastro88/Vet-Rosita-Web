export type Animal = {
  id: string;          
  nome: string;
  eta: number;         
  sesso: "m" | "f" | "n";
  tipo: "cane" | "gatto" | "esotico" | "topo" | "cincillà" | "altro";
  altro?: string;      
};