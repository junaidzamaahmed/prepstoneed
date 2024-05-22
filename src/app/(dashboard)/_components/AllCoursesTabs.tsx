import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesCarousel from "./coursesCarousel";

export default function AllCoursesTabs({ categories }: { categories: any[] }) {
  return (
    <section className="my-8 bg-primary/10 py-10">
      <div className="container">
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
          All Courses
        </h2>
        <Tabs defaultValue={categories[0]?.id} className="w-full">
          <TabsList className="bg-transparent px-0 space-x-2 mb-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                className="font-semibold text-lg px-2 data-[state=active]:text-primary data-[state=active]:bg-transparent hover:bg-primary/5"
                value={category.id}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <CoursesCarousel courses={category.courses} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
