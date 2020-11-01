import IBuilding from "../interfaces/IBuilding";

export function name(buildings: IBuilding[]) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ nome }: IBuilding, { nome: nome2 }: IBuilding) => {
      if (nome > nome2) return 1;
      if (nome < nome2) return -1;

      return 0;
    }
  );

  return [...sortedBuildings];
}

export function city(buildings: IBuilding[]) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ cidade }: IBuilding, { cidade: cidade2 }: IBuilding) => {
      if (cidade > cidade2) return 1;
      if (cidade < cidade2) return -1;

      return 0;
    }
  );

  return [...sortedBuildings];
}

export function neighborhood(buildings: IBuilding[]) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ bairro }: IBuilding, { bairro: bairro2 }: IBuilding) => {
      if (bairro > bairro2) return 1;
      if (bairro < bairro2) return -1;

      return 0;
    }
  );

  return [...sortedBuildings];
}

export function street(buildings: IBuilding[]) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ rua }: IBuilding, { rua: rua2 }: IBuilding) => {
      if (rua > rua2) return 1;
      if (rua < rua2) return -1;

      return 0;
    }
  );

  return [...sortedBuildings];
}

export function price(buildings: IBuilding[]) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ planta }: IBuilding, { planta: planta2 }: IBuilding) => {
      const { preco } = planta;
      const { preco: preco2 } = planta2;
      if (preco < preco2) return 1;
      if (preco > preco2) return -1;

      return 0;
    }
  );

  return [...sortedBuildings];
}
