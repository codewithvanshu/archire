import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PortfolioGalleryProps {
  items: {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
  }[];
}

export default function PortfolioGallery({ items }: PortfolioGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <p className="mt-2">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}