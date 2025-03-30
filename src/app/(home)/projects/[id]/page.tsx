import ProjectInfo from "@/components/common/project-info";
import ApplicationForm from "@/components/common/application-form";
import { getProjectDetails } from "@/actions/getProjectDetails";
import { supabase } from "@/lib/supabase";

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const project = await getProjectDetails(params.id);
  const { data: { user } } = await supabase.auth.getUser();

  if (!project) return <div>Project not found</div>;

  return (
    <div className="p-4">
      <ProjectInfo project={project} />
      {user && (
        <ApplicationForm
          projectId={project.id}
          onSubmit={async (data) => console.log("Application submitted:", { ...data, architectId: user.id })}
        />
      )}
    </div>
  );
}