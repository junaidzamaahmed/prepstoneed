import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error(
        "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
      );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
    const forwardedFor = headerPayload.get("x-forwarded-for");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occured", {
        status: 400,
      });
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;

    // CREATE USER IF EVENT TYPE IS USER_CREATED
    if (eventType === "user.created") {
      // Create a new user in your database
      if (!id) {
        return new Response("Error occured -- no svix headers", {
          status: 400,
        });
      }

      const user = await db.user.create({
        data: {
          externalId: id,
          email: evt.data.email_addresses[0]?.email_address,
          fullName: evt.data.first_name + " " + evt.data.last_name,
          phone: evt.data.phone_numbers[0]?.phone_number,
        },
      });
    }

    if (eventType === "session.created") {
      // Create a new session in your database
      if (!id) {
        return new Response("Error occured -- no svix headers", {
          status: 400,
        });
      }
      // const users = await clerkClient.users.getUserList();
      // users.data.forEach(async (user) => {
      //   await db.user.upsert({
      //     where: {
      //       externalId: user.id,
      //     },
      //     update: {
      //       email: user.emailAddresses[0]?.emailAddress,
      //       fullName: user.firstName + " " + user.lastName,
      //       phone: user.phoneNumbers[0]?.phoneNumber,
      //     },
      //     create: {
      //       externalId: user.id,
      //       email: user.emailAddresses[0]?.emailAddress,
      //       fullName: user.firstName + " " + user.lastName,
      //       phone: user.phoneNumbers[0]?.phoneNumber,
      //     },
      //   });
      // });
    }
    if (eventType == "user.updated") {
      if (!id) {
        return new Response("Error occured -- no svix headers", {
          status: 400,
        });
      }
      await db.user.upsert({
        where: {
          externalId: id,
        },
        update: {
          email: evt.data.email_addresses[0]?.email_address,
          fullName: evt.data.first_name + " " + evt.data.last_name,
          phone: evt.data.phone_numbers[0]?.phone_number,
        },
        create: {
          externalId: id,
          email: evt.data.email_addresses[0]?.email_address,
          fullName: evt.data.first_name + " " + evt.data.last_name,
          phone: evt.data.phone_numbers[0]?.phone_number,
        },
      });
    }
    if (eventType === "user.deleted") {
      if (!id) {
        return new Response("Error occured -- no svix headers", {
          status: 400,
        });
      }
      await db.user.delete({
        where: {
          externalId: id,
        },
      });
    }
    if (eventType === "session.ended") {
      // Update the session in your database
      if (!id) {
        return new Response("Error occured -- no svix headers", {
          status: 400,
        });
      }
      console.log("Session ended", evt.data);
    }
    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook", error);
    return new Response("Error occured", {
      status: 400,
    });
  }
}
