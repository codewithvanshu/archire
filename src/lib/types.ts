import { z } from "zod";



export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
}

export interface Proposal {
  id: string;
  title: string; 
  projectTitle: string;
  estimatedCost: number;
  status: string;
}


export const AccountDetailsFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name must be less than 100 characters"),
});
export const NewDetailsFormSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits").optional().or(z.literal("")),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional().or(z.literal("")),
});
export const AvatarFormSchema = z.object({
  avatar: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, "File size must be less than 5MB").refine(
    (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
    "Only JPEG, PNG, or GIF files are allowed"
  ).optional(),
});
export const PasswordFormSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords must match",
  path: ["confirm"],
});
export type AccountDetailsFormValues = z.infer<typeof AccountDetailsFormSchema>;
export type NewDetailsFormValues = z.infer<typeof NewDetailsFormSchema>;
export type AvatarFormValues = z.infer<typeof AvatarFormSchema>;
export type PasswordFormValues = z.infer<typeof PasswordFormSchema>;
export interface LoginFormValues {
  email: string;
  password: string;
}
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersByProject: {
    projectId: string;
    projectName: string;
    userCount: number;
  }[];
}
export interface Business {
  id: string;
  email: string;
}
export interface Admin {
  id: string;
  email: string;
}
export type LoginFormProps = {
  onSubmit: (values: z.infer<typeof loginformSchema>) => void;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  forgot?: React.ReactNode;
  isLoading?: boolean;
};
export type ForgotFormProps = {
  back?: React.ReactNode;
};
export type ResetFormProps = {
  back?: React.ReactNode;
};
export const signUpFormSchema = z.object({
  fullname: z.string().min(5, {
    message: "Company name must be at least 5 characters long.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  confirm: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
});
export const forgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
export const ResetPasswordFormSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  confirm: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
});

export const loginformSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export const projectfulllnameAndDescriptionUpdateFormSchema = z.object({
  fullname: z.string().min(3, {
    message: "Project Name must be at least 3 characters long.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long.",
  }),
});

export interface LogoProps extends React.ComponentProps<"svg"> {
  mode?: "light" | "dark";
}