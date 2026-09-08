"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server — avoids the SSR
 * "useLayoutEffect does nothing on the server" warning while keeping animation
 * setup synchronous before paint on the client.
 */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
