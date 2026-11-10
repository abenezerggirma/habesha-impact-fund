import { LeadershipMember } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { UserCheck, Shield } from "lucide-react";

interface LeadershipCardProps {
  member: LeadershipMember;
}

export function LeadershipCard({ member }: LeadershipCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between overflow-hidden border-slate-200/90 bg-white">
      <div>
        {member.photograph ? (
          <div className="p-4 pb-0">
            <OptimizedImage
              image={member.photograph}
              aspectRatio="square"
              showCaption={false}
            />
          </div>
        ) : (
          <div className="flex h-20 items-center justify-between border-b border-slate-100 bg-[#F8FAFC] px-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#102A43] text-[#D6A84B]">
              {member.isPlaceholder ? (
                <Shield className="h-5 w-5" aria-hidden="true" />
              ) : (
                <UserCheck className="h-5 w-5" aria-hidden="true" />
              )}
            </div>
            <Badge variant={member.isPlaceholder ? "draft" : "emerald"}>
              {member.isPlaceholder
                ? "Governance Role • Roster Pending"
                : "Verified Board Member"}
            </Badge>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl text-[#102A43]">{member.name}</CardTitle>
          <p className="text-sm font-semibold text-[#16856A]">{member.role}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-[#243746]">
            {member.biography}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
