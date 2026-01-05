export interface ApiUser {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  isActive?: boolean;
  lastLoginAt?: string;
  lastLoginIP?: string;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  name?: string;
}
export interface financialDetail {
  amount: number;
  currency: string;
  change: {
    percentage: number;
    // TODO:What if it did't change?
    trend: "up" | "down";
  };
}
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: ApiUser;
    accessToken: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: ApiUser;
}

export interface FinancialSummary {
  totalBalance: financialDetail;
  totalExpense: financialDetail;
  totalSavings: financialDetail;
  lastUpdated: Date;
}

export interface FinancialSummaryResponse {
  success: boolean;
  message: string;
  data: FinancialSummary;
}

export interface WorkingCapitalData {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export interface WorkingCapitalSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface WorkingCapital {
  period: string;
  currency: string;
  data: WorkingCapitalData[];
  summary: WorkingCapitalSummary;
}

export interface WorkingCapitalResponse {
  success: boolean;
  message: string;
  data: WorkingCapital;
}

export interface WalletCard {
  id: string;
  name?: string;
  type: string;
  cardNumber: string;
  bank: string;
  network?: string;
  expiryMonth: number;
  expiryYear: number;
  color?: string;
  isDefault: boolean;
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data: {
    cards: WalletCard[];
  };
}

export interface Transaction {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: Date;
  status: string;
}

export interface RecentTransactionsResponse {
  success: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    summary: {
      totalIncome: number;
      totalExpense: number;
      count: number;
    };
  };
}

export interface ScheduledTransfer {
  id: string;
  name: string;
  image: string;
  date: Date;
  amount: number;
  currency: string;
  status: string;
}

export interface ScheduledTransfersResponse {
  success: boolean;
  message: string;
  data: {
    transfers: ScheduledTransfer[];
    summary: {
      totalScheduledAmount: number;
      count: number;
    };
  };
}

export interface ApiError {
  success: boolean;
  message: string;
}
