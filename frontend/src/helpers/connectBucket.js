import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://pgxqlubmluraiqhrxqht.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBneHFsdWJtbHVyYWlxaHJ4cWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM2MzEzNjYsImV4cCI6MTk2OTIwNzM2Nn0.extLFcZ__Ejw3-mCjeCaPRnsMzhvvnyT2mqmbOGCQcw"
  );

  export default supabase;