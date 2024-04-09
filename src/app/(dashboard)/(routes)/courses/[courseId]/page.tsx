import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle } from "lucide-react";

export default function Course() {
  return (
    <div className="p-4 grid grid-cols-2 gap-4 lg:gap-16 container">
      <div className="">
        <h1 className="text-3xl font-semibold">
          DU IBA Admission Test Preparation 2024
        </h1>
        <p className="mt-3 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          nunc augue, feugiat non justo ac, elementum ultrices eros. Fusce sit
          amet ultrices ante, ac tempor ipsum. Quisque ac lacus a magna volutpat
          lobortis sed in ex. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Cras gravida ligula non
          ullamcorper interdum. Praesent porta neque eu porttitor euismod. Proin
          scelerisque quis nisi non fermentum. Nam pretium ante id libero
          tempor, in dapibus est commodo. Quisque vulputate molestie ultricies.
          Etiam commodo ultrices augue a vestibulum. Aliquam imperdiet tincidunt
          elit, sed malesuada quam euismod vel. Pellentesque et gravida sem.
        </p>
        <div className="border border-1 border-black/20 rounded-lg my-5 p-4">
          <h3 className="font-semibold text-lg">Course Instructor</h3>
          <div className="flex align-middle">
            <div>
              <img
                className="w-20 h-20 rounded-full my-3"
                src="https://media.licdn.com/dms/image/D5603AQF-GnUISpclZA/profile-displayphoto-shrink_200_200/0/1632307192368?e=2147483647&v=beta&t=LY_wVXpovCxN9duuSfLSK80EdaeGs5D1-zXUwFd7E54"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center ps-2">
              <p className="text-lg font-semibold">Azaz Koushik</p>
              <p className="text-sm">CEO, Prepstone</p>
              <p className="text-sm">University of Dhaka</p>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold my-1">
          What you'll learn in this course
        </h3>
        <div className="border border-1 border-black/20 rounded-lg p-4 grid grid-cols-2">
          <div className="">
            <p className="my-3">
              <CheckCircle size={16} className="inline-block text-blue-400" />
              <span className="ps-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, voluptatem.
              </span>
            </p>
          </div>
          <div className="">
            <p className="my-3">
              <CheckCircle size={16} className="inline-block text-blue-400" />
              <span className="ps-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tempore!
              </span>
            </p>
          </div>
          <div className="">
            <p className="my-3">
              <CheckCircle size={16} className="inline-block text-blue-400" />
              <span className="ps-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
                cupiditate vel molestias fuga adipisci blanditiis.
              </span>
            </p>
          </div>
          <div className="">
            <p className="my-3">
              <CheckCircle size={16} className="inline-block text-blue-400" />
              <span className="ps-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                iusto exercitationem incidunt modi!
              </span>
            </p>
          </div>
          <div className="">
            <p className="my-3">
              <CheckCircle size={16} className="inline-block text-blue-400" />
              <span className="ps-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Eveniet maiores atque ipsa.
              </span>
            </p>
          </div>
          <div className="">
            <p className="my-3">
              <CheckCircle size={16} className="inline-block text-blue-400" />
              <span className="ps-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Eveniet, mollitia error!
              </span>
            </p>
          </div>
          <div className="">
            <p className="my-3">
              <CheckCircle size={16} className="inline-block text-blue-400" />
              <span className="ps-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                suscipit molestias sit ducimus! Totam, sapiente.
              </span>
            </p>
          </div>
          <div className="">
            <p className="my-3">
              <CheckCircle size={16} className="inline-block text-blue-400" />
              <span className="ps-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Consequatur obcaecati quam temporibus ipsam unde?
              </span>
            </p>
          </div>
        </div>
        <h3 className="mt-4 mb-1 font-semibold text-lg">Class Routine</h3>
        <div>
          <table className="table-auto w-full text-left border-collapse border border-black/20">
            <thead>
              <tr>
                <th className="border-collapse border border-black/20 p-1">
                  Chapter Title
                </th>
                <th className="border-collapse border border-black/20 p-1">
                  Day
                </th>
                <th className="border-collapse border border-black/20 p-1">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-collapse border border-black/20 p-1">
                  Chapter 1
                </td>
                <td className="border-collapse border border-black/20 p-1">
                  Monday
                </td>
                <td className="border-collapse border border-black/20 p-1">
                  10:00 AM
                </td>
              </tr>
              <tr>
                <td className="border-collapse border border-black/20 p-1">
                  Chapter 2
                </td>
                <td className="border-collapse border border-black/20 p-1">
                  Wednesday
                </td>
                <td className="border-collapse border border-black/20 p-1">
                  10:00 AM
                </td>
              </tr>
              <tr>
                <td className="border-collapse border border-black/20 p-1">
                  Chapter 3
                </td>
                <td className="border-collapse border border-black/20 p-1">
                  Friday
                </td>
                <td className="border-collapse border border-black/20 p-1">
                  10:00 AM
                </td>
              </tr>
              <tr>
                <td className="border-collapse border border-black/20 p-1">
                  Chapter 4
                </td>
                <td className="border-collapse border border-black/20 p-1">
                  Saturday
                </td>
                <td className="border-collapse border border-black/20 p-1">
                  10:00 AM
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold mt-8 mb-1">FAQ</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Question 3?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Question 4?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="">
        <div className="border border-1 border-black/20 rounded-lg fixed mr-4 lg:mr-20">
          <img
            className="rounded-t-lg w-full"
            src="https://cdn.10minuteschool.com/images/catalog/media/HSC_26_English_Grammar_Course_16_9_1709632573053.jpg?w=1088&h=608"
            alt=""
          />
          <div className="p-2">
            <p className="text-2xl font-semibold">9,999 Taka</p>
            <button className="bg-primary text-white w-full py-3 rounded-lg my-3">
              Buy Now
            </button>
            <div className="my-4">
              {/* <h3 className="font-semibold text-lg">Course Details</h3> */}
              <div className="ps-3">
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">Total 30 Classes</span>
                </p>
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">40 Hour Lectures</span>
                </p>
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">Weekly Quiz</span>
                </p>
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">Final Exam</span>
                </p>
                <p className="my-3">
                  <CheckCircle
                    size={16}
                    className="inline-block text-blue-400"
                  />
                  <span className="ps-2">Certificate</span>
                </p>
              </div>
            </div>
          </div>
          <div className="fixed my-1">
            <span>
              Call us for any queries:{" "}
              <a className="text-primary" href="tel:+8801711111111">
                +8801711111111
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
