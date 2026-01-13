"use client"
import ListHeader from "@/modules/transaction/components/list-hrader";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";

interface TransactionData {
  id: string;
  amount: string;
  category: string;
  description: string;
  createdAt: string;
  userId: string;
}

const Transaction = () => {
  const transactionQuery = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/transaction`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      return response.json();
    }
  });

  const transactions = (transactionQuery.data || []) as TransactionData[];
  const isLoading = transactionQuery.isLoading;
  const error = transactionQuery.error;

  return (
    <div>
      <ListHeader />
      
      <div className="px-4 md:px-8">
        {isLoading && <p><Loader2Icon className="size-6 animate-spin text-primary" /></p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        
        {transactions.length === 0 && !isLoading && (
          <p className="text-gray-500">No transactions yet.</p>
        )}

        {transactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Amount</th>
                  <th className="text-left py-2 px-4">Category</th>
                  <th className="text-left py-2 px-4">Description</th>
                  <th className="text-left py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: TransactionData) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 font-semibold">${transaction.amount}</td>
                    <td className="py-2 px-4">{transaction.category}</td>
                    <td className="py-2 px-4">{transaction.description}</td>
                    <td className="py-2 px-4 text-gray-600">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
