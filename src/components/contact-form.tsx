"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { User, MailIcon, ArrowRightIcon, MessageSquare } from "lucide-react";
import { Account, Client, Databases, ID } from "appwrite";
import { useRef, useState } from "react";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const ContactForm: React.FC<{ onSubmitSuccess: () => void }> = ({
  onSubmitSuccess,
}) => {
  const handleSubmitForm1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget!);

    const databases = new Databases(client);
    const account = new Account(client);
    const current = await account.get();

    if (!current) {
      await account.createAnonymousSession();
    }

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      ID.unique(),
      {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }
    );

    alert("Message Sent Successfully!");

    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmitForm1} className="flex flex-col gap-y-4">
      {/* input */}
      <div className="relative flex items-center">
        <Input type="name" id="name" name="name" placeholder="Name" />
        <User className="absolute right-6" size={20} />
      </div>
      {/* input */}
      <div className="relative flex items-center">
        <Input type="email" name="email" id="email" placeholder="Email" />
        <MailIcon className="absolute right-6" size={20} />
      </div>
      {/* textarea */}
      <div className="relative flex items-center">
        <Textarea
          name="message"
          id="message"
          placeholder="Type Your Message Here."
        />
        <MessageSquare className="absolute top-4 right-6" size={20} />
      </div>
      <Button type="submit" className="flex items-center gap-x-1 max-w-[166px]">
        Let&apos;s Talk
        <ArrowRightIcon size={20} />
      </Button>
    </form>
  );
};

export default ContactForm;
