export type StoreMode = 'welcome' | 'detal' | 'mayorista';

export type Category = 'todos' | 'audio' | 'carga' | 'cables' | 'magsafe' | 'accesorios';

export interface Product {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  specs: string[];
  detalPrice: number;
  mayoristaPrice: number;
  minMayoristaQty: number;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
  iconName: string;
  image?: string;
  accentColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  companyOrId: string;
  paymentMethod: 'zelle' | 'pago_movil' | 'binance' | 'efectivo' | 'transferencia';
  notes: string;
}
