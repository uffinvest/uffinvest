import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export function useIsAdmin() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    if (loading) return;
    if (!user) {
      setIsAdmin(false);
      setChecking(false);
      return;
    }
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (active) {
        setIsAdmin(Boolean(data));
        setChecking(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user, loading]);

  return { isAdmin, checking };
}
