// SubmitButton.tsx
"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  defaultText: string;
  pendingText: string;
};

export default function SubmitButton({
  defaultText,
  pendingText,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? pendingText : defaultText}
    </button>
  );
}
