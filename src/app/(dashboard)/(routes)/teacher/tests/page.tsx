import { Button } from "@/components/ui/button";
import Link from "next/link";

const TestsPage = () => {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>New Test</Button>
      </Link>
    </div>
  );
};

export default TestsPage;
