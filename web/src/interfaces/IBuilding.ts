export default interface IBuilding {
  bairro: string;
  cep: string;
  cidade: string;
  fachada: string;
  location: {
    _lat: number;
    _long: number;
  };
  nome: string;
  num: string;
  rua: string;
  planta: {
    dorms: number;
    metragem: number;
    preco: number;
    vagas: number;
  };
}
