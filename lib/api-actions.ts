import type {
  LoginResponse,
  RegisterResponse,
  ApiError,
  UserProfileResponse,
  FinancialSummaryResponse,
  WorkingCapitalResponse,
  WalletResponse,
  RecentTransactionsResponse,
  ScheduledTransfersResponse,
  RefreshTokenResponse,
} from "@/types/ApiResponse";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function _login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: LoginResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error((data as ApiError).message || "Login failed");
  }

  return data as LoginResponse;
}

export async function _register(
  fullName: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password }),
  });

  const data: RegisterResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error((data as ApiError).message || "Registration failed");
  }

  return data as RegisterResponse;
}

export async function _refreshToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const res = await fetch(`${API_BASE}/users/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data: RefreshTokenResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error((data as ApiError).message || "Token refresh failed");
  }

  return data as RefreshTokenResponse;
}

export async function _getUserProfile(
  accessToken: string
): Promise<UserProfileResponse> {
  const res = await fetch(`${API_BASE}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: UserProfileResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error((data as ApiError).message || "Failed to get profile");
  }

  return data as UserProfileResponse;
}

export async function _getFinancialSummary(
  accessToken: string
): Promise<FinancialSummaryResponse> {
  const res = await fetch(`${API_BASE}/financial/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: FinancialSummaryResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error((data as ApiError).message || "Failed to get summary");
  }

  return data as FinancialSummaryResponse;
}

export async function _getWorkingCapital(
  accessToken: string
): Promise<WorkingCapitalResponse> {
  const res = await fetch(`${API_BASE}/financial/working-capital`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: WorkingCapitalResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(
      (data as ApiError).message || "Failed to get working capital"
    );
  }

  return data as WorkingCapitalResponse;
}

export async function _getWallet(accessToken: string): Promise<WalletResponse> {
  const res = await fetch(`${API_BASE}/financial/wallet`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: WalletResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error((data as ApiError).message || "Failed to get wallet");
  }

  return data as WalletResponse;
}

export async function _getRecentTransactions(
  accessToken: string
): Promise<RecentTransactionsResponse> {
  const res = await fetch(`${API_BASE}/financial/transactions/recent`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: RecentTransactionsResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error((data as ApiError).message || "Failed to get transactions");
  }

  return data as RecentTransactionsResponse;
}

export async function _getScheduledTransfers(
  accessToken: string
): Promise<ScheduledTransfersResponse> {
  const res = await fetch(`${API_BASE}/financial/transfers/scheduled`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: ScheduledTransfersResponse | ApiError = await res.json();

  if (!res.ok || !data.success) {
    throw new Error((data as ApiError).message || "Failed to get transfers");
  }

  return data as ScheduledTransfersResponse;
}
