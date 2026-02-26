// Mock data for the admin dashboard

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "borrower" | "lender" | "network";
  status: "active" | "inactive" | "suspended";
  preferred: boolean;
  createdAt: string;
}

export interface Submission {
  id: string;
  userId: string;
  userName: string;
  status: "pending" | "reviewing" | "approved" | "rejected";
  businessName: string;
  loanAmount: number;
  notes: string;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  category: "template" | "guide" | "legal" | "form";
  fileUrl: string;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  type: "video" | "pdf" | "link";
  url: string;
  tags: string[];
  createdAt: string;
}

export interface Provider {
  id: string;
  name: string;
  type: string;
  state: string;
  contact: string;
  approved: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: "succeeded" | "pending" | "failed" | "refunded";
  createdAt: string;
}

export const mockUsers: User[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.com", role: "admin", status: "active", preferred: false, createdAt: "2024-01-15" },
  { id: "2", name: "Mike Chen", email: "mike@example.com", role: "lender", status: "active", preferred: true, createdAt: "2024-02-20" },
  { id: "3", name: "Emily Davis", email: "emily@example.com", role: "borrower", status: "active", preferred: true, createdAt: "2024-03-10" },
  { id: "4", name: "James Wilson", email: "james@example.com", role: "lender", status: "inactive", preferred: false, createdAt: "2024-03-15" },
  { id: "5", name: "Lisa Anderson", email: "lisa@example.com", role: "borrower", status: "suspended", preferred: false, createdAt: "2024-04-01" },
  { id: "6", name: "Robert Taylor", email: "robert@example.com", role: "lender", status: "active", preferred: true, createdAt: "2024-04-12" },
  { id: "7", name: "Anna Martinez", email: "anna@example.com", role: "borrower", status: "active", preferred: false, createdAt: "2024-05-08" },
  { id: "8", name: "David Brown", email: "david@example.com", role: "network", status: "active", preferred: true, createdAt: "2024-05-20" },
  { id: "9", name: "Karen White", email: "karen@example.com", role: "network", status: "active", preferred: false, createdAt: "2024-06-01" },
];

export const mockSubmissions: Submission[] = [
  { id: "S001", userId: "3", userName: "Emily Davis", status: "pending", businessName: "Davis Construction LLC", loanAmount: 500000, notes: "", createdAt: "2024-06-01" },
  { id: "S002", userId: "5", userName: "Lisa Anderson", status: "reviewing", businessName: "Anderson Logistics", loanAmount: 250000, notes: "Needs additional documentation", createdAt: "2024-05-28" },
  { id: "S003", userId: "7", userName: "Anna Martinez", status: "approved", businessName: "Martinez Holdings", loanAmount: 1000000, notes: "Strong financials", createdAt: "2024-05-15" },
  { id: "S004", userId: "3", userName: "Emily Davis", status: "rejected", businessName: "Davis Ventures", loanAmount: 750000, notes: "Insufficient collateral", createdAt: "2024-04-20" },
  { id: "S005", userId: "7", userName: "Anna Martinez", status: "pending", businessName: "Martinez Real Estate", loanAmount: 2000000, notes: "", createdAt: "2024-06-05" },
];

export const mockDocuments: Document[] = [
  { id: "D001", title: "Loan Application Template", description: "Standard commercial loan application form", category: "template", fileUrl: "#", createdAt: "2024-01-10" },
  { id: "D002", title: "Borrower Guide", description: "Complete guide for new borrowers", category: "guide", fileUrl: "#", createdAt: "2024-02-15" },
  { id: "D003", title: "Terms of Service", description: "Platform terms and conditions", category: "legal", fileUrl: "#", createdAt: "2024-01-05" },
  { id: "D004", title: "Financial Statement Form", description: "Template for submitting financial statements", category: "form", fileUrl: "#", createdAt: "2024-03-20" },
];

export const mockResources: Resource[] = [
  { id: "R001", title: "Getting Started with Commercial Loans", type: "video", url: "#", tags: ["intro", "education"], createdAt: "2024-02-01" },
  { id: "R002", title: "SBA Loan Requirements PDF", type: "pdf", url: "#", tags: ["sba", "requirements"], createdAt: "2024-03-01" },
  { id: "R003", title: "Market Rate Analysis Tool", type: "link", url: "#", tags: ["tools", "rates"], createdAt: "2024-04-01" },
  { id: "R004", title: "Underwriting Best Practices", type: "video", url: "#", tags: ["underwriting", "education"], createdAt: "2024-04-15" },
];

export const mockProviders: Provider[] = [
  { id: "P001", name: "First National Lending", type: "Bank", state: "California", contact: "contact@fnl.com", approved: true },
  { id: "P002", name: "Pacific Credit Union", type: "Credit Union", state: "Oregon", contact: "info@pcu.com", approved: true },
  { id: "P003", name: "Sunrise Capital", type: "Private Lender", state: "Texas", contact: "hello@sunrise.com", approved: false },
  { id: "P004", name: "Metro Finance Group", type: "CDFI", state: "New York", contact: "ops@metro.com", approved: true },
  { id: "P005", name: "Heritage Savings", type: "Bank", state: "Florida", contact: "info@heritage.com", approved: false },
];

export const mockPayments: Payment[] = [
  { id: "PAY001", userId: "2", userName: "Mike Chen", amount: 99, status: "succeeded", createdAt: "2024-06-01" },
  { id: "PAY002", userId: "4", userName: "James Wilson", amount: 99, status: "succeeded", createdAt: "2024-06-01" },
  { id: "PAY003", userId: "6", userName: "Robert Taylor", amount: 199, status: "succeeded", createdAt: "2024-06-01" },
  { id: "PAY004", userId: "8", userName: "David Brown", amount: 99, status: "pending", createdAt: "2024-06-05" },
  { id: "PAY005", userId: "2", userName: "Mike Chen", amount: 99, status: "failed", createdAt: "2024-05-01" },
  { id: "PAY006", userId: "6", userName: "Robert Taylor", amount: 199, status: "refunded", createdAt: "2024-04-01" },
];

export const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 5800 },
  { month: "Mar", revenue: 7200 },
  { month: "Apr", revenue: 6800 },
  { month: "May", revenue: 9400 },
  { month: "Jun", revenue: 11200 },
];

export const userGrowthData = [
  { month: "Jan", users: 45 },
  { month: "Feb", users: 72 },
  { month: "Mar", users: 98 },
  { month: "Apr", users: 134 },
  { month: "May", users: 178 },
  { month: "Jun", users: 215 },
];

export const submissionData = [
  { month: "Jan", submissions: 12 },
  { month: "Feb", submissions: 18 },
  { month: "Mar", submissions: 24 },
  { month: "Apr", submissions: 31 },
  { month: "May", submissions: 28 },
  { month: "Jun", submissions: 35 },
];
