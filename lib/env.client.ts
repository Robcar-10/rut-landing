// lib/env.client.ts
"use client";

export const GA_MEASUREMENT_ID = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID : undefined;
export const FB_PIXEL_ID = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_FB_PIXEL_ID : undefined;