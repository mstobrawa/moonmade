export type CartItem = {
  id: string;
  title: string;
  price: number; // np. w groszach (24900) — łatwiej liczyć
  image?: string;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "REMOVE_ITEM"; payload: { id: string } } // usuń po id
  | { type: "CLEAR" }; // wyczyść koszyk
