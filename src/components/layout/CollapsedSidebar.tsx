import { HomeIcon, Link, Library, BookCopy } from "lucide-react";
import { ElementType } from "react";

const CollapsedSidebar = () => {
  type entries = {
    icon: ElementType;
    text: string;
  };
  const sideBar: entries[] = [
    { icon: HomeIcon, text: "Home" },
    { icon: Link, text: "Shorts" },
    { icon: Library, text: "Subscriptions" },
    { icon: BookCopy, text: "You" },
  ];
  return (
    <div className="flex flex-col w-[60px]">
      {
        sideBar.map((item: entries, index: number) => (
          <div className="flex flex-col items-center justify-center py-3 hover:bg-slate-800 rounded-md" key={index}>
            <item.icon/>
            <span className="text-[10px] max-w-[100%] text-ellipsis overflow-hidden whitespace-nowrap">{item.text}</span>
          </div>
        ))
      }
    </div>
  );
};

export default CollapsedSidebar;
