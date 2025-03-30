
import SearchFilter from "@/components/common/search-filter";
import { getPublicProjects } from "@/actions/getPublicProjects";

export default async function Home({ searchParams }: { searchParams: { q?: string; filter?: string } }) {
  const searchQuery = searchParams.q || "";
  const filter = searchParams.filter || "";
  const initialProjects = await getPublicProjects(searchQuery, filter);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ArchHire Projects</h1>
      <SearchFilter initialProjects={initialProjects} initialQuery={searchQuery} initialFilter={filter} />
    </div>
  );
}