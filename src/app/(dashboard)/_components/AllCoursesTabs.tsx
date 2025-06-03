import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesCarousel from "./coursesCarousel";

export default function AllCoursesTabs({ categories }: { categories: any[] }) {
  return (
    <section className='py-16 bg-muted/50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-8 text-primary'>
          Explore Our Courses
        </h2>
        <Tabs
          defaultValue={categories[0]?.id}
          className='w-full items-center justify-between flex flex-col'
        >
          <TabsList className='drop-shadow-md p-2 mb-8 flex flex-wrap justify-center bg-white rounded-xl space-x-2 h-full w-fit'>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                className='font-medium text-base px-4 py-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
                value={category.id}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className='w-full flex justify-center items-center'
            >
              <CoursesCarousel courses={category.courses} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
