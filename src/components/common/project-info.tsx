interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  category: string;
  requirements: string;
}

interface ProjectInfoProps {
  project: Project;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p>{project.description}</p>
      <p><strong>Budget:</strong> ${project.budget.toLocaleString()}</p>
      <p><strong>Timeline:</strong> {project.timeline}</p>
      <p><strong>Category:</strong> {project.category}</p>
      <p><strong>Requirements:</strong> {project.requirements}</p>
    </div>
  );
}