export type Animal = {
  id: string;
  nome: string;
  eta: number;
  sesso: "m" | "f" | "n";
  tipo:
    | "cane"
    | "gatto"
    | "coniglio"
    | "roditore"
    | "uccello"
    | "rettile"
    | "anfibio"
    | "pesce"
    | "altro";
  altro?: string;
};
