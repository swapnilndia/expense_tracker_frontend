// razorpay.d.ts

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  order_id: string;
  callback_url: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayInstance {
  open(): void;
  on(event: string, callback: (response: any) => void): void;
}

export interface Window {
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
