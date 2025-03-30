import ProjectList from "@/components/common/project-list";
import ProposalList from "@/components/common/proposal-list";
import { getClientDashboardData } from "@/actions/client/getClientDashboardData";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function ClientDashboard() {
  const cookieStore = await  cookies();

  const supabase = createSupabaseServerClient({
    getCookie: (name) => cookieStore.get(name)?.value,
    setCookie: (name, value, options) => {
      cookieStore.set(name, value, options);
    },
    deleteCookie: (name, options) => {
      cookieStore.set(name, "", { ...options, maxAge: 0 });
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Please log in</div>;

  const { projects, proposals } = await getClientDashboardData(user.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
      <ProjectList projects={projects} />
      <h2 className="text-xl font-semibold mb-2">Received Proposals</h2>
      <ProposalList proposals={proposals} />
    </div>
  );
}