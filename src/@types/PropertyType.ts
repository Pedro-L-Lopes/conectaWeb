export type PropertyType = {
  id?: string;
  area?: number;
  banheiros?: number;
  condominio?: string;
  createdAt?: string;
  descricao?: string;
  endereco?: {
    bairro?: string;
    cep?: string;
    cidade?: string;
    complemento?: string;
    estado?: string;
    numero?: string;
    rua?: string;
  };
  finalidade?: string;
  fotos?: string[];
  preco?: number;
  quartos?: number;
  status?: string;
  suites?: number;
  tipo?: string;
  tipoArea?: string;
  usuarioId?: string;
  vagas?: number;
  visualizacoes?: number;
};
