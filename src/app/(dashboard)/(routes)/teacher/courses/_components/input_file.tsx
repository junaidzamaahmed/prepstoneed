"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";

export const InputFile = () => {
  const { user } = useUser();
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  // const fileChangeHandler = async (e: any) => {
  //   const file: File = e.target.files[0];
  //   if (file.type !== "text/csv") {
  //     toast.error("Please select a csv file to import");
  //   } else {
  //     // Papa.parse(file, {
  //     //   header: true,
  //     //   skipEmptyLines: true,
  //     //   complete: function (results) {
  //     // setData(results.data);
  //     // const sections: any[] = [];
  //     // const questions: any[] = [];
  //     // const answers: any[] = [];
  //     // const elem: any = results.data[0];

  //     // const test = {
  //     //   title: elem?.title,
  //     //   description: elem?.description,
  //     //   duration:parseInt(elem?.duration),
  //     //   price: parseInt(elem?.price),
  //     //   sections:[]
  //     // }
  //     // results.data.forEach((elem: any) => {
  //     //   if (elem["title"]) {
  //     //     tests.push({
  //     //       title: elem["title"],
  //     //       description: elem["description"],
  //     //       duration: parseInt(elem["duration"]),
  //     //       price: parseInt(elem["price"]),
  //     //     });
  //     //     last = "test";
  //     //     num = elem["numberOfSections"];
  //     //   } else if (elem["sectionName"]) {
  //     //     sections.push({
  //     //       name: elem["sectionName"],
  //     //     });
  //     //   }
  //     // });
  //     // const test = {
  //     //   title: elem["title"],
  //     //   description: elem["description"],
  //     //   duration: parseInt(elem["duration"]),
  //     //   price: parseInt(elem["price"]),
  //     //   isPublished: true,
  //     // };
  //     // let last = "section";
  //     // let ansArr: any[] = [];
  //     // let quesArr: any[] = [];
  //     // for (let i = 1; i < results.data.length; i++) {
  //     //   let elem: any = results?.data[i];
  //     // let section={}
  //     // for (let i = 1; i < results?.data?.length; i++){
  //     //   let element:any = results?.data[i];
  //     //   if (element?.sectionName) {
  //     //     section = {
  //     //       name: element?.sectionName,
  //     //       isPublished: true,
  //     //       position: i,
  //     //       questions:[]
  //     //     };
  //     //   }

  //     // }
  //     //   if (elem?.sectionName) {
  //     //     if (last !== "section") {
  //     //       last = "section";
  //     //       answers.push(ansArr);
  //     //       questions.push(quesArr);
  //     //       ansArr = [];
  //     //       quesArr = [];
  //     //     }
  //     //     sections.push({
  //     //       name: elem?.sectionName,
  //     //       isPublished: true,
  //     //       position: i,
  //     //     });
  //     //   } else if (elem?.question) {
  //     //     if (last === "answer") {
  //     //       last = "question";
  //     //       answers.push(ansArr);
  //     //       ansArr = [];
  //     //     }
  //     //       quesArr.push({
  //     //         question: ques?.question,
  //     //         explanation: ques?.explanation,
  //     //         imageUrl: ques?.imageUrl,
  //     //         position: j - i + 1,
  //     //         isPublished: true,
  //     //       });
  //     // }

  //     // const quesArr: any[] = [];
  //     // for (let j = i; j < i + elem["numberOfQuestions"]; j++) {
  //     //   let ques: any = results?.data[j];
  //     //   console.log(ques?.question);
  //     //   quesArr.push({
  //     //     question: ques?.question,
  //     //     explanation: ques?.explanation,
  //     //     imageUrl: ques?.imageUrl,
  //     //     position: j - i + 1,
  //     //     isPublished: true,
  //     //   });
  //     //   const ansArr: any[] = [];
  //     //   for (let k = i; k < i + elem["numberOfAnswers"]; k++) {
  //     //     let ans: any = results?.data[j];
  //     //     console.log(ans?.text);
  //     //     ansArr.push({
  //     //       text: ans?.answer,
  //     //       isCorrect: ans?.isCorrect === "yes" ? true : false,
  //     //       position: k - i + 1,
  //     //     });
  //     //     i++;
  //     //     j++;
  //     //   }
  //     //   answers.push(ansArr);
  //     //   i++;
  //     // }
  //     // questions.push(quesArr);
  //     // },
  //     // console.log(test);
  //     // console.log(sections);
  //     // console.log(questions);
  //     // console.log(answers);
  //     // });
  //     const test = {
  //       title: "Full Test 1",
  //       description: "this is description",
  //       duration: 1800,
  //       price: 100,
  //       sections: [
  //         {
  //           position: 1,
  //           name: "A",
  //           questions: [
  //             {
  //               position: 1,
  //               question: "Which one is correct?",
  //               explanation: "This is why",
  //               imageUrl:
  //                 "https://utfs.io/f/4d9733bf-6d79-4a81-a80e-e46fc29f0d9e-spd3yk.png",
  //               answers: [
  //                 {
  //                   position: 1,
  //                   text: "A",
  //                   isCorrect: false,
  //                 },
  //                 {
  //                   position: 2,
  //                   text: "B",
  //                   isCorrect: false,
  //                 },
  //                 {
  //                   position: 3,
  //                   text: "C",
  //                   isCorrect: true,
  //                 },
  //                 {
  //                   position: 4,
  //                   text: "D",
  //                   isCorrect: false,
  //                 },
  //               ],
  //             },
  //             {
  //               position: 2,
  //               question: "Now which one is correct?",
  //               explanation: "This is why",
  //               imageUrl:
  //                 "https://utfs.io/f/4d9733bf-6d79-4a81-a80e-e46fc29f0d9e-spd3yk.png",
  //               answers: [
  //                 {
  //                   position: 1,

  //                   id: "5",
  //                   text: "A",
  //                   isCorrect: false,
  //                 },
  //                 {
  //                   position: 2,

  //                   id: "6",
  //                   text: "B",
  //                   isCorrect: true,
  //                 },
  //                 {
  //                   position: 3,

  //                   id: "7",
  //                   text: "C",
  //                   isCorrect: false,
  //                 },
  //                 {
  //                   position: 4,
  //                   id: "8",
  //                   text: "D",
  //                   isCorrect: false,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         {
  //           id: "2",
  //           position: 2,
  //           name: "B",
  //           questions: [
  //             {
  //               position: 1,
  //               id: "3",
  //               question: "Which one is correct?",
  //               explanation: "This is why",
  //               imageUrl:
  //                 "https://utfs.io/f/4d9733bf-6d79-4a81-a80e-e46fc29f0d9e-spd3yk.png",
  //               answers: [
  //                 {
  //                   position: 1,

  //                   id: "9",
  //                   text: "A",
  //                   isCorrect: false,
  //                 },
  //                 {
  //                   position: 2,

  //                   id: "10",
  //                   text: "B",
  //                   isCorrect: false,
  //                 },
  //                 {
  //                   position: 3,

  //                   id: "11",
  //                   text: "C",
  //                   isCorrect: true,
  //                 },
  //                 {
  //                   position: 4,
  //                   id: "12",
  //                   text: "D",
  //                   isCorrect: false,
  //                 },
  //               ],
  //             },
  //             {
  //               position: 2,

  //               id: "4",
  //               question: "Now which one is correct?",
  //               explanation: "This is why",
  //               imageUrl:
  //                 "https://utfs.io/f/4d9733bf-6d79-4a81-a80e-e46fc29f0d9e-spd3yk.png",
  //               answers: [
  //                 {
  //                   position: 1,

  //                   id: "13",
  //                   text: "A",
  //                   isCorrect: false,
  //                 },
  //                 {
  //                   position: 2,

  //                   id: "14",
  //                   text: "B",
  //                   isCorrect: true,
  //                 },
  //                 {
  //                   position: 3,

  //                   id: "15",
  //                   text: "C",
  //                   isCorrect: false,
  //                 },
  //                 {
  //                   position: 4,

  //                   id: "16",
  //                   text: "D",
  //                   isCorrect: false,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     };
  //     try {
  //       console.log(test);
  //       await axios.post("/api/tests/bulk", test);
  //       toast.success("Successful");
  //       router.refresh();
  //     } catch {
  //       toast.error("Something went wrong");
  //     }
  //   }
  // };
  // const isFirst = useRef(true);
  // useEffect(() => {
  //   async function postData() {
  //     let elem = data[0];
  //     const test = {
  //       title: elem?.title,
  //       duration: parseInt(elem?.duration),
  //       price: parseInt(elem?.price),
  //       description: elem?.description,
  //     };
  //     let testId: any;
  //     try {
  //       toast.info("Please wait");
  //       console.log(test);
  //       testId = await axios.post(`/api/tests`, test);
  //       toast.success("Added test");
  //     } catch {
  //       toast.error("Something went wrong");
  //     }
  //     let section: any;
  //     let question: any;
  //     let answer: any;
  //     for (let i = 0; i < data.length; i++) {
  //       let elem = data[i];
  //       if (elem?.sectionName) {
  //         section = {
  //           name: elem?.sectionName,
  //           isPublished: true,
  //         };
  //         try {
  //           toast.info("Please wait");
  //           section = await axios.post(
  //             `/api/tests/${testId?.id}/sections`,
  //             section
  //           );
  //           toast.success("Success");
  //         } catch {
  //           toast.error("Something went wrong");
  //         }
  //       } else if (elem?.question) {
  //         question = {
  //           question: elem?.question,
  //           explanation: elem?.explanation,
  //           imageUrl: elem?.imageUrl,
  //           isPublished: true,
  //         };
  //         try {
  //           toast.info("Please wait");
  //           question = await axios.post(
  //             `/api/tests/${testId?.id}/sections/${section?.id}/questions`,
  //             question
  //           );
  //           toast.success("Success");
  //         } catch {
  //           toast.error("Something went wrong");
  //         }
  //       } else {
  //         answer = {
  //           text: elem?.answer,
  //           isCorrect: elem?.isCorrect ? true : false,
  //         };
  //         try {
  //           toast.info("Please wait");
  //           await axios.post(
  //             `/api/tests/${testId?.id}/sections/${section?.id}/questions/${question?.id}/answers`,
  //             answer
  //           );
  //           toast.success("Success");
  //         } catch {
  //           toast.error("Something went wrong");
  //         }
  //       }
  //     }
  //   }
  //   if (!isFirst.current && data.length) {
  //     postData();
  //   }
  // }, [data]);
  // useEffect(() => {
  //   isFirst.current = false;
  // });

  console.log(data);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Import CSV</Label>
      <Input
        id="picture"
        type="file"
        accept=".csv"
        // onChange={fileChangeHandler}
      />
    </div>
  );
};
