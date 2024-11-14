import webpush from "@/lib/webpushConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    const { title, body, subscription } = reqBody;

    if (!subscription) {
      return NextResponse.json(
        { error: "Invalid subscribtion." },
        { status: 200 }
      );
    }

    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: title,
        body: body,
      })
    );

    return NextResponse.json({ msg: "OK" }, { status: 200 });
  } catch (error) {
    console.log("Error while sending push notfication", error);
    return NextResponse.json(
      { error: "Invalid subscribtion." },
      { status: 200 }
    );
  }
}
