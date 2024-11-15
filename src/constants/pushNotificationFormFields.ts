import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  className?: string;
  minLength?: number;
  placeholder?: string;
}

type FormFieldType = {
  name: "title" | "body";
  label: string;
  placeholder: string;
  component: React.ComponentType<Props>;
  props?: Props;
};

export const PushNotificationFormFields: FormFieldType[] = [
  {
    name: "title",
    label: "Title",
    placeholder: "Notification title",
    component: Input,
  },
  {
    name: "body",
    label: "Body",
    placeholder: "Notification body...",
    component: Textarea,
    props: { className: "h-48" },
  },
];
