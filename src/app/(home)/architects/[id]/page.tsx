import PortfolioGallery from "@/components/common/portfolio-gallery";
import ReviewList from "@/components/common/review-list";
import { getArchitectProfileData } from "@/actions/getArchitectProfileData";

export default async function ArchitectProfile({ params }: { params: { id: string } }) {
  const { portfolio, reviews } = await getArchitectProfileData(params.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Architect Profile</h1>
      <PortfolioGallery items={portfolio} />
      <ReviewList reviews={reviews} />
    </div>
  );
}