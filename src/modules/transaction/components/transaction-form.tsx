import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from "react-hook-form";
import { transactionSchema } from '../schema';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

type TransactionValue = z.infer<typeof transactionSchema>;

interface TransactionProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TransactionForm = ({ onSuccess, onCancel}: TransactionProps) => {
  const queryClient = useQueryClient();

  const { mutate: submitTransaction, isPending } = useMutation({
    mutationFn: async (values: TransactionValue) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/transaction/extract`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      form.reset();
      onSuccess?.();
    }
  });

  const form = useForm<TransactionValue>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: "",
      description: "",
      category: "Bills",
    },
  });

  const onSubmit = (data: TransactionValue) => {
    submitTransaction(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="e.g 50.00" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select {...field} className="w-full px-3 py-2 border rounded-md">
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter transaction description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;