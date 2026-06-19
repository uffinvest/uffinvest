import { createFileRoute } from "@tanstack/react-router";

const ADMIN_EMAIL = "uffinvest@gmail.com";
const ADMIN_PASSWORD = "setormkt!11";

export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Check existing
        const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers({
          page: 1,
          perPage: 200,
        });
        if (listErr) return new Response(listErr.message, { status: 500 });

        const existing = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
        let userId = existing?.id;

        if (!existing) {
          const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            email_confirm: true,
            user_metadata: { display_name: "Administrador UFFinvest" },
          });
          if (error) return new Response(error.message, { status: 500 });
          userId = data.user?.id;
        } else {
          // Ensure password and confirmed
          await supabaseAdmin.auth.admin.updateUserById(existing.id, {
            password: ADMIN_PASSWORD,
            email_confirm: true,
          });
        }

        if (userId) {
          await supabaseAdmin
            .from("user_roles")
            .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
        }

        return Response.json({ ok: true, userId });
      },
    },
  },
});
