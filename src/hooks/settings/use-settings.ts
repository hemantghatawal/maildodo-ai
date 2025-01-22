"use client";
import {
  ChangePasswordProps,
  ChangePasswordSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadClient } from "@uploadcare/upload-client";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { useToast } from "../use-toast";
import {
  onChatBotImageUpdate,
  onDeleteUserDomain,
  onUpdateDomain,
  onUpdatePassword,
  onUpdateWelcomeMessage,
} from "@/actions/settings";
import {
  DomainSettingsProps,
  DomainSettingsSchema,
} from "@/schemas/settings.schema";
import { useRouter } from "next/navigation";

const upload = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
});

export const useThemeMode = () => {
  const { setTheme, theme } = useTheme();
  return {
    setTheme,
    theme,
  };
};

export const useChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onChangePassword = handleSubmit(async (values: ChangePasswordProps) => {
    try {
      setLoading(true);
      const updated = await onUpdatePassword(values.password);
      if (updated) {
        reset();
        setLoading(false);
        toast({ title: "Success", description: updated.message });
      }
    } catch (error) {
      console.log(error);
    }
  });
  return {
    register,
    errors,
    onChangePassword,
    loading,
  };
};

export const useSettings = (id: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema),
  });

  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onUpdateSettings = handleSubmit(async (values: DomainSettingsProps) => {
    setLoading(true);
    if (values.domain) {
      const domain = await onUpdateDomain(id, values.domain);
      if (domain) {
        toast({
          title: "Success",
          description: domain.message,
        });
      }
    }

    if (values.image[0]) {
      const uploaded = await upload.uploadFile(values.image[0]);
      const image = await onChatBotImageUpdate(id, uploaded.uuid);
      if (image) {
        toast({
          title: image.status == 200 ? "Success" : "Error",
          description: image.message,
        });
        setLoading(false);
      }
    }

    if (values.welcomeMessage) {
      const message = await onUpdateWelcomeMessage(id, values.welcomeMessage);
      if (message) {
        toast({
          title: "Success",
          description: message.message,
        });
      }
    }

    reset();
    router.refresh();
    setLoading(false);
  });

  const onDeleteDomain = async () => {
    setDeleting(true);
    const deleted = await onDeleteUserDomain(id);
    if (deleted) {
      toast({
        title: "Success",
        description: deleted.message,
      });

      setDeleting(false);
      router.refresh();
    }
  };
  return {
    register,
    onUpdateSettings,
    errors,
    loading,
    onDeleteDomain,
    deleting,
  };
};
