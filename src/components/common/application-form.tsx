"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const applicationSchema = z.object({
  proposal: z.string().min(100, "Proposal must be at least 100 characters"),
  estimatedCost: z.number().min(0, "Estimated cost must be positive"),
  proposedTimeline: z.string().min(1, "Timeline is required"),
  projectId: z.string(), // Include projectId in schema
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  projectId: string;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
}

export default function ApplicationForm({ projectId, onSubmit }: ApplicationFormProps) {
  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      proposal: "",
      estimatedCost: 0,
      proposedTimeline: "",
      projectId, // Include projectId in default values
    },
  });

  const handleSubmit = async (data: ApplicationFormData) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="proposal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposal</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Describe your proposal" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Cost</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="proposedTimeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposed Timeline</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., 3 months" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Application</Button>
      </form>
    </Form>
  );
}