
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreditCard, Calendar, AlertCircle, ChevronLeft, Loader2 } from "lucide-react";

const paymentFormSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number cannot exceed 19 digits")
    .regex(/^[0-9\s-]*$/, "Card number can only contain numbers, spaces, and hyphens"),
  cardHolder: z.string().min(3, "Cardholder name must be at least 3 characters"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in format MM/YY"),
  cvv: z.string()
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits")
    .regex(/^[0-9]*$/, "CVV can only contain numbers"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  initialValues: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
  };
  onSubmit: (values: PaymentFormValues) => void;
  isProcessing: boolean;
  onBackToBilling: () => void;
}

export function PaymentForm({ initialValues, onSubmit, isProcessing, onBackToBilling }: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: initialValues,
  });

  // Card number formatting
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Payment Information</h2>
        <Button 
          variant="ghost" 
          type="button" 
          size="sm"
          onClick={onBackToBilling}
          className="text-muted-foreground hover:text-foreground"
          disabled={isProcessing}
        >
          <ChevronLeft size={16} className="mr-1" /> Back
        </Button>
      </div>
      
      <div className="bg-muted p-4 rounded-lg mb-6 flex items-start gap-3">
        <AlertCircle size={20} className="text-amber-500 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium mb-1">Test Mode</p>
          <p className="text-muted-foreground">
            This is a demo payment form. No real payments will be processed.
            Use any valid-looking card details.
          </p>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="4111 1111 1111 1111"
                      className="pl-10" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(formatCardNumber(e.target.value));
                      }}
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cardHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cardholder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="MM/YY" 
                        className="pl-10"
                        maxLength={5}
                        {...field}
                        onChange={(e) => {
                          field.onChange(formatExpiryDate(e.target.value));
                        }}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123" 
                      maxLength={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="mt-2">
            <Button 
              type="submit" 
              className="luxury-button w-full" 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                "Complete Payment"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
