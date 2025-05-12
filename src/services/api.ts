import axios from "axios";

// API base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Basic API methods
export const apiService = {
  // Health check
  healthCheck: () =>
    axios.get("http://localhost:5000/health", { timeout: 3000 }),

  // Authentication
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  registerLeader: (data: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    groupName: string;
    groupId?: string;
    presidentName?: string;
    savingMonth: string;
    savingYear: string;
  }) => api.post("/auth/register-leader", data),

  registerMember: (data: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: string;
  }) => api.post("/auth/register-member", data),

  // User profile
  getCurrentUser: () => api.get("/auth/me"),

  updateProfile: (data: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => api.put("/auth/profile", data),

  // Group management
  getGroupDetails: () => api.get("/groups"),

  updateGroup: (data: {
    name?: string;
    president?: string;
    savingMonth?: string;
    savingYear?: string;
  }) => api.put("/groups", data),

  getGroupMembers: () => api.get("/groups/members"),

  getRulesAndNotices: () => api.get("/groups/rules-notices"),

  updateRulesAndNotices: (data: { rules?: string[]; notices?: string[] }) =>
    api.put("/groups/rules-notices", data),

  // Savings management
  addSavings: (data: {
    userId: string;
    amount: number;
    month: string;
    year: string;
    notes?: string;
  }) => api.post("/savings", data),

  getMySavings: () => api.get("/savings/me"),

  getUserSavings: (userId: string) => api.get(`/savings/user/${userId}`),

  getMonthlySavings: (month: string, year: string) =>
    api.get(`/savings/month/${month}/${year}`),

  updateSavings: (id: string, amount: number) =>
    api.put(`/savings/${id}`, { amount }),

  deleteSavings: (id: string) => api.delete(`/savings/${id}`),

  // Loan management
  requestLoan: (data: {
    amount: number;
    purpose: string;
    durationMonths: number;
  }) => api.post("/loans/request", data),

  getMyLoans: () => api.get("/loans/me"),

  updateLoanStatus: (id: string, status: string) =>
    api.put(`/loans/${id}/status`, { status }),

  recordLoanPayment: (
    id: string,
    data: {
      amount: number;
      month: string;
      year: string;
      notes?: string;
    }
  ) => api.post(`/loans/${id}/payment`, data),

  // Transaction management
  addTransaction: (data: {
    amount: number;
    type: string;
    category: string;
    description: string;
    month: string;
    year: string;
  }) => api.post("/transactions", data),

  getTransactions: (filters?: {
    type?: string;
    month?: string;
    year?: string;
  }) => {
    const config = { params: filters || {} };
    return api.get("/transactions", config);
  },

  getMonthlyTransactions: (month: string, year: string) =>
    api.get(`/transactions/monthly/${month}/${year}`),

  updateTransaction: (
    id: string,
    data: {
      amount?: number;
      category?: string;
      description?: string;
    }
  ) => api.put(`/transactions/${id}`, data),

  deleteTransaction: (id: string) => api.delete(`/transactions/${id}`),
};

export default apiService;
