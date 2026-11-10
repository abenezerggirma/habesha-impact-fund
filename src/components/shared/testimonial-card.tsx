import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquareQuote } from "lucide-react";

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  verified: boolean;
}

interface TestimonialCardProps {
  testimonial?: TestimonialItem;
}

/**
 * Community Reflection / Testimonial Component
 *
 * IMPORTANT: Never fabricate testimonials or beneficiary quotes.
 * When no verified testimonial is supplied, this component renders a transparent
 * invitation for real community supporters and partners to share their perspective.
 */
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  if (!testimonial || !testimonial.verified) {
    return (
      <Card className="border-dashed border-slate-300 bg-[#F8FAFC]">
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <MessageSquareQuote
              className="h-5 w-5 text-[#16856A]"
              aria-hidden="true"
            />
            <Badge variant="outline">Community Reflections</Badge>
          </div>
          <p className="text-sm leading-relaxed text-[#243746]">
            Habesha Impact Fund does not publish synthetic or unverified testimonials. As our
            community programs and donor initiatives launch, verified reflections from partners,
            volunteers, and supporters will be featured here with explicit permission.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200 bg-white">
      <CardContent className="space-y-4 p-6 sm:p-8">
        <MessageSquareQuote
          className="h-8 w-8 text-[#D6A84B]"
          aria-hidden="true"
        />
        <blockquote className="font-serif text-lg italic leading-relaxed text-[#102A43]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="text-sm">
          <p className="font-bold text-[#102A43]">{testimonial.authorName}</p>
          <p className="text-slate-600">{testimonial.authorRole}</p>
        </div>
      </CardContent>
    </Card>
  );
}
