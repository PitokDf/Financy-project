"use client";

import { ReusableForm } from "@/components/ui/reuseable-form";
import { useAuth } from "@/hooks/use-auth";
import { User, Mail } from "lucide-react";
import z from "zod";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/lib/zustand/auth-store";

interface UpdateProfileFormProps {
  initialData?: {
    name: string;
    email?: string;
  };
}

export function UpdateProfileForm({ initialData }: UpdateProfileFormProps) {
  const { updateProfileMutation } = useAuth();
  const t = useTranslations("profileEdit");
  const { user } = useAuthStore();

  const updateProfileSchema = z.object({
    name: z.string().min(3, t("minCharacters", { count: 3 })),
    email: z.string().email(t("invalidEmail")).optional().or(z.literal("")),
  });

  type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

  return (
    <ReusableForm<UpdateProfileValues>
      fields={[
        {
          label: t("fullName"),
          name: "name",
          placeholder: t("fullNamePlaceholder"),
          type: "text",
          icon: User,
        },
        {
          label: t("emailAddress"),
          name: "email",
          placeholder: t("emailAddressPlaceholder"),
          type: "email",
          icon: Mail,
          disabled: user?.hasPassword ? false : true,
        },
      ]}
      defaultValues={{
        name: initialData?.name || "",
        email: initialData?.email || "",
      }}
      schema={updateProfileSchema}
      onSubmit={(values) =>
        updateProfileMutation({ ...values, email: values.email || undefined })
      }
      submitText={t("saveChanges")}
    />
  );
}
