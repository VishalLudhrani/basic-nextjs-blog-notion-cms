'use client';

import { usePathname } from "next/navigation";
import { useState } from "react";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFeedbackReceived, setIsFeedbackReceived] = useState(false);
  const pathname = usePathname();

  const handleFeedback = (e) => {
    setFeedback(e.target.value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target)
    console.log('form data', formData)
    setLoading(true);
    try {
      const response = await fetch('/__forms.html', {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams(formData).toString() + `&src=${pathname}`
      });
      if (response.ok) {
        setIsFeedbackReceived(true);
      }
    } catch(error) {
      console.error('error while submitting feedback', error);
      setError(error)
    } finally {
      setLoading(false)
    }
  };

  console.log('feedback', feedback)

  return (
    <form name="feedback" onSubmit={handleFormSubmit}  className="my-4">
      <input type="hidden" name="form-name" value="feedback" />
      <h3 className="text-lg font-bold">Was this page helpful?</h3>
      {isFeedbackReceived ? 'Feedback received, thanks.' : loading ? 'Submitting your feedback. Please wait' : error ? 'Oops. There was an error submitting your feedback' : (
        <>
          <div className="flex items-center gap-2 w-fit my-2">
            <label htmlFor="like" className={`block w-full text-sm text-gray-600 dark:text-neutral-500 cursor-pointer border ${feedback === 'like' ? 'border-slate-100' : 'border-slate-600'} p-2 rounded-md`}>
              <input hidden id="like" name="like-dislike" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" value="like" onChange={handleFeedback} />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
            </label>
            
            <label htmlFor="dislike" className={`block w-full text-sm text-gray-600 dark:text-neutral-500 cursor-pointer border ${feedback === 'dislike' ? 'border-slate-100' : 'border-slate-600'} p-2 rounded-md`}>
              <input hidden id="dislike" name="like-dislike" type="radio" className="border-gray-200 rounded-full disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" value="dislike" onChange={handleFeedback} />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-down"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>
            </label>
          </div>
          <button type="submit" className="p-2 border border-slate-600 rounded-md">Submit</button>
        </>
      )}
    </form>
  );
}
