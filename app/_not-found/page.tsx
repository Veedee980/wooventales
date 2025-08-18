"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function NotFoundPage() {
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Example: fetch something if needed
    // async function fetchData() {
    //   const { data } = await supabase.from('your_table').select('*');
    //   console.log(data);
    // }
    // fetchData();
  }, [supabase]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Page Not Found</h1>
    </div>
  );
}
