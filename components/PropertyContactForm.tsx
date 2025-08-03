"use client";

import { Property } from "@/types";
import { FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import addMessage from "@/lib/actions/addMessage";
import { toast } from "react-toastify";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  body: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

const PropertyContactForm = ({ property }: { property: Property }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await addMessage(
      data.name,
      data.email,
      data.phone ?? "",
      data.body,
      property._id,
      property.owner
    );

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Message sent successfully");
      reset();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="mb-6 text-xl font-bold">Contact Property Manager</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            {...register("name")}
            id="name"
            className={`w-full px-3 py-2 leading-tight text-gray-700 border ${
              errors.name ? "border-red-500" : ""
            } rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            type="text"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Email:
          </label>
          <input
            {...register("email")}
            id="email"
            className={`w-full px-3 py-2 leading-tight text-gray-700 border ${
              errors.email ? "border-red-500" : ""
            } rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Phone:
          </label>
          <input
            {...register("phone")}
            id="phone"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Message:
          </label>
          <textarea
            {...register("body")}
            id="body"
            className={`w-full px-3 py-2 text-gray-700 border ${
              errors.body ? "border-red-500" : ""
            } rounded shadow appearance-none h-44 focus:outline-none focus:shadow-outline`}
            placeholder="Enter your message"
          ></textarea>
          {errors.body && (
            <p className="mt-1 text-sm text-red-500">{errors.body.message}</p>
          )}
        </div>

        <div>
          <button
            className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <FaPaperPlane className="mr-2" />{" "}
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyContactForm;
