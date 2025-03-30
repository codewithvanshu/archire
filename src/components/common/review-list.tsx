import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string | null;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <CardTitle>{review.reviewerName} - {review.rating}/5</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{review.comment || "No comment provided"}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}