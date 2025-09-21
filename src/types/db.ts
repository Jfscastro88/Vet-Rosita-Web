export type ClientInsert = {
    iscrizione?: string; // server can generate
    nome: string;
    cognome: string;
    telefono: string;
    email?: string | null;
    sesso: 'f' | 'm' | 'ncb' | 'npd';
    data_nascita?: string | null; // ISO date 'YYYY-MM-DD'
    has_account?: boolean;
    auth_user_id?: string | null;
};

export type Client = ClientInsert & {
    id: string;
    created_at: string;
    updated_at: string;
    iscrizione: string; // after insert it’s definitely set
};

export type AnimalInsert = {
    client_id: string;
    nome: string;
    eta?: number | null;
    sesso?: 'f' | 'm' | 'n';
    tipo?: 'cane' | 'gatto' | 'uccello' | 'rettile' | 'roditore' | 'esotico' | 'altro';
    altro?: string | null;
};

export type Animal = AnimalInsert & {
    id: string;
    created_at: string;
    updated_at: string;
    sesso: 'f' | 'm' | 'n';
    tipo: 'cane' | 'gatto' | 'uccello' | 'rettile' | 'roditore' | 'esotico' | 'altro';
};