export type Client = {
  id: number;
  iscrizione: string;
  nome: string;
  cognome: string;
  dataNascita?: Date;
  telefono: string;
  sesso: "f" | "m" | "ncb" | "npd";
  email?: string;
  hasAccount: boolean;
};