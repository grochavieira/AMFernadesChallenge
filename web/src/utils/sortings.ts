import IBuilding from "../interfaces/IBuilding";

export function name(buildings: IBuilding[], type: string) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ nome }: IBuilding, { nome: nome2 }: IBuilding) => {
      if (type === "ascending") {
        if (nome > nome2) return 1;
        if (nome < nome2) return -1;
      } else {
        if (nome < nome2) return 1;
        if (nome > nome2) return -1;
      }
      return 0;
    }
  );

  return [...sortedBuildings];
}

export function city(buildings: IBuilding[], type: string) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ cidade }: IBuilding, { cidade: cidade2 }: IBuilding) => {
      if (type === "ascending") {
        if (cidade > cidade2) return 1;
        if (cidade < cidade2) return -1;
      } else {
        if (cidade < cidade2) return 1;
        if (cidade > cidade2) return -1;
      }

      return 0;
    }
  );

  return [...sortedBuildings];
}

export function neighborhood(buildings: IBuilding[], type: string) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ bairro }: IBuilding, { bairro: bairro2 }: IBuilding) => {
      if (type === "ascending") {
        if (bairro > bairro2) return 1;
        if (bairro < bairro2) return -1;
      } else {
        if (bairro < bairro2) return 1;
        if (bairro > bairro2) return -1;
      }

      return 0;
    }
  );

  return [...sortedBuildings];
}

export function street(buildings: IBuilding[], type: string) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ rua }: IBuilding, { rua: rua2 }: IBuilding) => {
      if (type === "ascending") {
        if (rua > rua2) return 1;
        if (rua < rua2) return -1;
      } else {
        if (rua < rua2) return 1;
        if (rua > rua2) return -1;
      }

      return 0;
    }
  );

  return [...sortedBuildings];
}

export function price(buildings: IBuilding[], type: string) {
  const copyBuildings = [...buildings];
  const sortedBuildings = copyBuildings.sort(
    ({ planta }: IBuilding, { planta: planta2 }: IBuilding) => {
      const { preco } = planta;
      const { preco: preco2 } = planta2;

      if (type === "ascending") {
        if (preco > preco2) return 1;
        if (preco < preco2) return -1;
      } else {
        if (preco < preco2) return 1;
        if (preco > preco2) return -1;
      }

      return 0;
    }
  );

  return [...sortedBuildings];
}
