const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1";

export interface Drink {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

export interface DrinkDetail {
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: string]: unknown;
}

// Obtener lista por categoría
export async function getDrinks(): Promise<Drink[]> {
  const res = await fetch(`${API_BASE}/filter.php?c=Ordinary%20Drink`);
  const data = await res.json();
  return data.drinks.slice(0, 15); // Mínimo 15 para cumplir examen
}

// Obtener detalle por ID
export async function getDrinkDetail(id: string): Promise<DrinkDetail> {
  const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.drinks[0];
}
