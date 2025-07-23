"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { RESOURCES } from "@/types/booking";
import Link from "next/link";

const BookingFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const resourceParam = searchParams.get("resource") || "All Resources";
  const dateParam = searchParams.get("date") || "";

  const handleSearchQuery = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "" || value === "All Resources") {
      params.delete(query);
    } else {
      params.set(query, value);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Select
          value={resourceParam}
          onValueChange={(value) => handleSearchQuery("resource", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by resource" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Resources">All Resources</SelectItem>
            {RESOURCES.map((resource) => (
              <SelectItem key={resource} value={resource}>
                {resource}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Input
          type="date"
          value={dateParam}
          onChange={(e) => handleSearchQuery("date", e.target.value)}
          placeholder="Filter by date"
        />
      </div>

      <Button
        variant="outline"
        onClick={() => {
          router.push(`${pathname}`, {
            scroll: false,
          });
        }}
        className="flex items-center gap-2 cursor-pointer bg-transparent"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </Button>
      <Link
        href="/"
        className="px-4 py-1 bg-black text-white rounded-lg transition-colors shadow-sm"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default BookingFilter;
