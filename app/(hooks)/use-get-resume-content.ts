"use client";

import { useState, useEffect, useRef } from "react";
import { getResumeContentAction } from "@/app/(actions)/resume-action";

export function useGetResumeContent(isOpen: boolean) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const isFetchingRef = useRef(false);
  useEffect(() => {
    if (isOpen && !content && !isFetchingRef.current) {
      isFetchingRef.current = true;
      queueMicrotask(() => {
        setIsLoading(true);
        getResumeContentAction({})
          .then((data) => setContent(data))
          .finally(() => {
            setIsLoading(false);
            isFetchingRef.current = false;
          });
      });
    }
  }, [isOpen, content]);
  return { content, isLoading };
}
