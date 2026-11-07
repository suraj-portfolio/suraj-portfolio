"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { User, MailIcon, ArrowRightIcon, MessageSquare } from "lucide-react";
import { Account, Client, TablesDB, ID } from "appwrite";
import { useRef, useState } from "react";

const ContactForm: React.FC<{ onSubmitSuccess: () => void }> = ({
  onSubmitSuccess,
}) => {
  const handleSubmitForm1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget!);

    try {
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
      const tablesDB = new TablesDB(client);
      const account = new Account(client);

      // account.get() throws when the visitor has no session yet
      await account.get().catch(() => account.createAnonymousSession());

      await tablesDB.createRow({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        tableId: process.env.NEXT_PUBLIC_APPWRITE_TABLE_ID!,
        rowId: ID.unique(),
        data: {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        },
      });
    } catch (error) {
      console.error("Contact form failed", error);
      alert("Sorry, your message could not be sent. Please email me instead.");
      return;
    }

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
