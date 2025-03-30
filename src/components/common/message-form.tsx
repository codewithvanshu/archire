"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface MessageFormData {
  content: string;
  conversationId: string;
}

interface MessageFormProps {
  conversationId: string;
  onSubmit: (data: MessageFormData) => Promise<void>;
}

export default function MessageForm({ conversationId, onSubmit }: MessageFormProps) {
  const form = useForm<MessageFormData>({
    defaultValues: {
      content: "",
      conversationId,
    },
  });

  const handleSubmit = async (data: MessageFormData) => {
    await onSubmit({ ...data, conversationId });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Type your message..." />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
}