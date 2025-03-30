import ProjectList from "@/components/common/project-list";
import ProposalList from "@/components/common/proposal-list";
import { getArchitectDashboardData } from "@/actions/architect/getArchitectDashboardData";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";


export default async function ArchitectDashboard() {
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

  const { appliedProjects, proposals } = await getArchitectDashboardData(user.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Architect Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Applied Projects</h2>
      <ProjectList projects={appliedProjects} />
      <h2 className="text-xl font-semibold mb-2">Your Proposals</h2>
      <ProposalList proposals={proposals} />
    </div>
  );
}