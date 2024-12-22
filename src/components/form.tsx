"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { User, MailIcon, ArrowRightIcon, MessageSquare } from "lucide-react";
import { Account, Client, Databases, ID } from "appwrite";
import { useRef } from "react";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const handleFormSubmit = (formData: FormData) => {
    console.log(formData.get("name"));
    alert("Message Sent Successfully!");
  };

  const handleSubmitForm1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formRef.current);
    const formData = new FormData(formRef.current!);
    console.log(formData.get("name"));
    alert("Message Sent Successfully!");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmitForm1}
      //action={handleFormSubmit}
      // onSubmit={async (e) => {
      //   e.preventDefault();

      //   const formData = new FormData(e.currentTarget);

      //   console.log(formData);

      //   console.log(
      //     formData.get("name"),
      //     formData.get("email"),
      //     formData.get("message")
      //   );

      //   const databases = new Databases(client);

      //   const account = new Account(client);

      //   const current = await account.get();

      //   if (!current) {
      //     await account.createAnonymousSession();
      //   }

      //   await databases.createDocument(
      //     process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      //     process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      //     ID.unique(),
      //     {
      //       name: formData.get("name"),
      //       email: formData.get("email"),
      //       message: formData.get("message"),
      //     }
      //   );

      //   e.currentTarget.reset();
      //   alert("Message Sent Successfully!");
      // }}
      className="flex flex-col gap-y-4"
    >
      {/* input */}
      <div className="relative flex items-center">
        <Input type="name" id="name" placeholder="Name" />
        <User className="absolute right-6" size={20} />
      </div>
      {/* input */}
      <div className="relative flex items-center">
        <Input type="email" id="email" placeholder="Email" />
        <MailIcon className="absolute right-6" size={20} />
      </div>
      {/* textarea */}
      <div className="relative flex items-center">
        <Textarea id="message" placeholder="Type Your Message Here." />
        <MessageSquare className="absolute top-4 right-6" size={20} />
      </div>
      <Button type="submit" className="flex items-center gap-x-1 max-w-[166px]">
        Let&apos;s Talk
        <ArrowRightIcon size={20} />
      </Button>
    </form>
  );
};

export default Form;
