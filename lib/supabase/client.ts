import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    "https://cqklrzciqlfmjsogzjha.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxa2xyemNpcWxmbWpzb2d6amhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0Nzg2NTgsImV4cCI6MjA2ODA1NDY1OH0.Gl4yavwkmfIa-2Ls7NQg4XhkOI7qkgOk3jW8TA9Qulo"
  );
}

