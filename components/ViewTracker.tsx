"use client";

import { useEffect } from "react";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

export function ViewTracker({
  event,
  params,
}: {
  event: AnalyticsEvent;
  params?: Record<string, string | number | boolean>;
}) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
