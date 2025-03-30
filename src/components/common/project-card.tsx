import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{project.description.substring(0, 100)}...</p>
        <p className="text-sm text-muted-foreground">Category: {project.category}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>Budget: ${project.budget.toLocaleString()}</p>
        <Button asChild>
          <Link href={`/projects/${project.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}