"use client";

import { useState, useTransition } from "react";
import SearchBar from "./search-bar";
import FilterDropdown from "./filter-dropdown";
import ProjectList from "./project-list";
import { getPublicProjects } from "@/actions/getPublicProjects";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
}

interface SearchFilterProps {
  initialProjects: Project[];
  initialQuery: string;
  initialFilter: string;
}

export default function SearchFilter({ initialProjects, initialQuery, initialFilter }: SearchFilterProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filter, setFilter] = useState(initialFilter);
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    startTransition(async () => {
      const updatedProjects = await getPublicProjects(query, filter);
      setProjects(updatedProjects);
    });
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    startTransition(async () => {
      const updatedProjects = await getPublicProjects(searchQuery, newFilter);
      setProjects(updatedProjects);
    });
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <FilterDropdown
          filter={filter}
          onFilterChange={handleFilterChange}
          options={["Residential", "Commercial", "Industrial"]}
        />
      </div>
      {isPending ? <p>Loading...</p> : <ProjectList projects={projects} />}
    </>
  );
}