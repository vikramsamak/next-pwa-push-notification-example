"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "./ui/spinner";
import { urlBase64ToUint8Array } from "@/helpers/urlBase64ToUint8Array";
import { pushNotificationSchema } from "@/schemas/pushNotificationSchema";
import { z } from "zod";
import { PushNotificationFormFields } from "@/constants/pushNotificationFormFields";
import {
  PUSH_NOTIFICATION_ROUTE,
  PUSH_SUBSCRIPTION_KEY,
} from "@/constants/constants";

export function PushNotificationForm() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(PUSH_SUBSCRIPTION_KEY) as string) ||
          null
      : null
  );

  async function registerServiceWorker() {
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        console.error("Notification permission denied by the user.");
        return;
      }
    }

    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });

    const sub = await registration.pushManager.getSubscription();
    if (sub) {
      setSubscription(sub);
      localStorage.setItem(PUSH_SUBSCRIPTION_KEY, JSON.stringify(sub));
    }
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    if (sub) {
      setSubscription(sub);
      localStorage.setItem(PUSH_SUBSCRIPTION_KEY, JSON.stringify(sub));
    }
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker();
      subscribeToPush();
    }
  }, []);

  const form = useForm<z.infer<typeof pushNotificationSchema>>({
    resolver: zodResolver(pushNotificationSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  async function onSubmit(values: z.infer<typeof pushNotificationSchema>) {
    try {
      setLoading(true);
      await axios.post(PUSH_NOTIFICATION_ROUTE, {
        title: values.title,
        body: values.body,
        subscription: subscription,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {PushNotificationFormFields.map((fieldConfig, index) => (
          <FormField
            key={index}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <fieldConfig.component
                    placeholder={fieldConfig.placeholder}
                    {...fieldConfig.props}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" className="w-full" disabled={isLoading}>
          Generate {isLoading && <Spinner className="bg-foreground" />}
        </Button>
      </form>
    </Form>
  );
}
