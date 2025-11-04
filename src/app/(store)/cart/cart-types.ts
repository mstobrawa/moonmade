export type CartItem = {
  id: string;
  title: string;
  price: number; // np. w groszach (24900) — łatwiej liczyć
  qty: number;
  image?: string;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem } // dodaj lub zwiększ qty
  | { type: "REMOVE_ITEM"; payload: { id: string } } // usuń po id
  | { type: "SET_QTY"; payload: { id: string; qty: number } } // ustaw quantity
  | { type: "CLEAR" }; // wyczyść koszyk
