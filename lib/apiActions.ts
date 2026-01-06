import type {
  LoginResponse,
  RegisterResponse,
  UserProfileResponse,
  FinancialSummaryResponse,
  WorkingCapitalResponse,
  WalletResponse,
  RecentTransactionsResponse,
  ScheduledTransfersResponse,
  RefreshTokenResponse,
} from "@/types/ApiResponse";
import { handleApiResponse } from "./apiError";

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
  return handleApiResponse(res);
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
  return handleApiResponse(res);
}

export async function _refreshToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  const res = await fetch(`${API_BASE}/users/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  return handleApiResponse(res);
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
  return handleApiResponse(res);
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
  return handleApiResponse(res);
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
  return handleApiResponse(res);
}

export async function _getWallet(accessToken: string): Promise<WalletResponse> {
  const res = await fetch(`${API_BASE}/financial/wallet`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return handleApiResponse(res);
}

export async function _getRecentTransactions(
  accessToken: string,
  limit: number
): Promise<RecentTransactionsResponse> {
  const res = await fetch(
    `${API_BASE}/financial/transactions/recent?limit=${limit || 3}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return handleApiResponse(res);
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
  return handleApiResponse(res);
}
