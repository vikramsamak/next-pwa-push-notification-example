"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PushNotificationForm } from "./PushNotificationForm";

function GeneratePushNotificationCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Push Notification</CardTitle>
        <CardDescription>
          Fill the below details generate example push notification.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PushNotificationForm />
      </CardContent>
    </Card>
  );
}

export default GeneratePushNotificationCard;
