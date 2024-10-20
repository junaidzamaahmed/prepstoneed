"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Edit2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Option {
  label: string;
  value: string;
}
export function FancyBox({
  options,
  addFunction,
  multiselect,
  selectedValues,
  setSelectedValues,
}: {
  options: Option[];
  addFunction: (label: string) => void;
  multiselect?: boolean;
  selectedValues: any;
  setSelectedValues: any;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [frameworks, setFrameworks] = React.useState(options);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const createFramework = async (name: string) => {
    const newFramework = await addFunction(name);
    if (typeof newFramework === undefined) return;
    if (!multiselect) {
      setFrameworks((prev: any) => [...prev, newFramework]);
      setSelectedValues([newFramework]);
      return;
    }
    setFrameworks((prev: any) => [...prev, newFramework]);
    setSelectedValues((prev: any) => [...prev, newFramework]);
  };

  const toggleFramework = (framework: any) => {
    if (!multiselect) {
      setSelectedValues((currentFrameworks: any) =>
        currentFrameworks.includes(framework) ? [] : [framework]
      );
      inputRef?.current?.focus();
      return;
    }
    setSelectedValues((currentFrameworks: any) =>
      !currentFrameworks.includes(framework)
        ? [...currentFrameworks, framework]
        : currentFrameworks.filter((l: any) => l.value !== framework.value)
    );
    inputRef?.current?.focus();
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  return (
    <div className="max-w-[200px] max-h-32">
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className="w-[200px] justify-between text-foreground"
          >
            <span className="truncate">
              {selectedValues.length === 0 && "Select labels"}
              {selectedValues.length === 1 && selectedValues[0]?.label}
              {selectedValues.length === 2 &&
                selectedValues.map(({ label }: any) => label).join(", ")}
              {selectedValues.length > 2 &&
                `${selectedValues.length} labels selected`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command loop>
            <CommandInput
              ref={inputRef}
              placeholder="Create..."
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup className="max-h-[145px] overflow-auto">
                {frameworks.map((framework) => {
                  const isActive = selectedValues.includes(framework);
                  return (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={() => toggleFramework(framework)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex-1">{framework.label}</div>
                    </CommandItem>
                  );
                })}
                <CommandItemCreate
                  onSelect={() => createFramework(inputValue)}
                  {...{ inputValue, frameworks }}
                />
              </CommandGroup>
              <CommandSeparator alwaysRender />
              {/* <CommandGroup>
                <CommandItem
                  value={`:${inputValue}:`} // HACK: that way, the edit button will always be shown
                  className="text-xs text-muted-foreground"
                  onSelect={() => setOpenDialog(true)}
                >
                  <div className={cn("mr-2 h-4 w-4")} />
                  <Edit2 className="mr-2 h-2.5 w-2.5" />
                  Edit Labels
                </CommandItem>
              </CommandGroup> */}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          if (!open) {
            setOpenCombobox(true);
          }
          setOpenDialog(open);
        }}
      >
        <DialogContent className="flex max-h-[90vh] flex-col">
          <DialogHeader>
            <DialogTitle>Edit Labels</DialogTitle>
            <DialogDescription>
              Change the label names or delete the labels. Create a label
              through the combobox though.
            </DialogDescription>
          </DialogHeader>
          <div className="-mx-6 flex-1 overflow-scroll px-6 py-2">
            {frameworks.map((framework) => {
              return (
                <DialogListItem
                  key={framework.value}
                  onDelete={() => deleteFramework(framework)}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const target = e.target as typeof e.target &
                      Record<"name" | "color", { value: string }>;
                    const newFramework = {
                      value: target.name.value.toLowerCase(),
                      label: target.name.value,
                      color: target.color.value,
                    };
                    updateFramework(framework, newFramework);
                  }}
                  {...framework}
                />
              );
            })}
          </div>
          <DialogFooter className="bg-opacity-40">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <div className="relative -mb-24 mt-3 h-24 overflow-y-auto">
        {selectedValues.map(
          ({ label, value }: { label: string; value: string }) => (
            <Badge
              key={value}
              variant="outline"
              // style={badgeStyle(color)}
              className="mb-2 mr-2"
            >
              {label}
            </Badge>
          )
        )}
      </div>
    </div>
  );
}

const CommandItemCreate = ({
  inputValue,
  frameworks,
  onSelect,
}: {
  inputValue: string;
  frameworks: any[];
  onSelect: () => void;
}) => {
  const hasNoFramework = !frameworks
    .map(({ value }) => value)
    .includes(`${inputValue.toLowerCase()}`);

  const render = inputValue !== "" && hasNoFramework;

  if (!render) return null;

  // BUG: whenever a space is appended, the Create-Button will not be shown.
  return (
    <CommandItem
      key={`${inputValue}`}
      value={`${inputValue}`}
      className="text-xs text-muted-foreground"
      onSelect={onSelect}
    >
      <div className={cn("mr-2 h-4 w-4")} />
      Create new label &quot;{inputValue}&quot;
    </CommandItem>
  );
};

// const DialogListItem = ({
//   value,
//   label,
//   color,
//   onSubmit,
//   onDelete,
// }:any) => {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const [accordionValue, setAccordionValue] = React.useState<string>("");
//   const [inputValue, setInputValue] = React.useState<string>(label);
//   const [colorValue, setColorValue] = React.useState<string>(color);
//   const disabled = label === inputValue && color === colorValue;

//   React.useEffect(() => {
//     if (accordionValue !== "") {
//       inputRef.current?.focus();
//     }
//   }, [accordionValue]);

//   return (
//     <Accordion
//       key={value}
//       type="single"
//       collapsible
//       value={accordionValue}
//       onValueChange={setAccordionValue}
//     >
//       <AccordionItem value={value}>
//         <div className="flex items-center justify-between">
//           <div>
//             <Badge variant="outline" style={badgeStyle(color)}>
//               {label}
//             </Badge>
//           </div>
//           <div className="flex items-center gap-4">
//             <AccordionTrigger>Edit</AccordionTrigger>
//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Button variant="destructive" size="xs">
//                   Delete
//                 </Button>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Are you sure sure?</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     You are about to delete the label{" "}
//                     <Badge variant="outline" style={badgeStyle(color)}>
//                       {label}
//                     </Badge>{" "}
//                     .
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                   <AlertDialogAction onClick={onDelete}>
//                     Delete
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>
//         <AccordionContent>
//           <form
//             className="flex items-end gap-4"
//             onSubmit={(e) => {
//               onSubmit(e);
//               setAccordionValue("");
//             }}
//           >
//             <div className="grid w-full gap-3">
//               <Label htmlFor="name">Label name</Label>
//               <Input
//                 ref={inputRef}
//                 id="name"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="h-8"
//               />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="color">Color</Label>
//               <Input
//                 id="color"
//                 type="color"
//                 value={colorValue}
//                 onChange={(e) => setColorValue(e.target.value)}
//                 className="h-8 px-2 py-1"
//               />
//             </div>
//             {/* REMINDER: size="xs" */}
//             <Button type="submit" disabled={disabled} size="xs">
//               Save
//             </Button>
//           </form>
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   );
// };
