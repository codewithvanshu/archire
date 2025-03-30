import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <Input
      type="text"
      placeholder="Search projects..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full max-w-md"
    />
  );
}