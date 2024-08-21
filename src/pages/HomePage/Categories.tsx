import { AppDispatch, RootState } from "../../store/store";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryList,
  CategoryType,
  updateSelcetedCategory,
  // fetchVideoList
} from "../../store/slices/homeSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {};

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categoryList
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategoryId
  );

  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [translate, setranslate] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const translateAmount = 200;

  useEffect(() => {
    dispatch(fetchCategoryList());
    // dispatch(fetchVideoList(selectedCategory));
  }, [dispatch]);

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setIsRightVisible(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [categories]);

  const handleCategorySelect = (id: string) => {
    dispatch(updateSelcetedCategory(id));
    // dispatch()
  };

  return (
    <div ref={scrollContainerRef} className="overflow-hidden relative px-4">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category: CategoryType) => (
          <div
            className={`rounded-lg bg-[rgba(255,255,255,0.1)] text-ellipsis whitespace-nowrap py-1 px-3 flex-shrink-0 cursor-pointer ${
              category.id === selectedCategory && "bg-white text-black"
            }`}
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-0 bg-gradient-to-r from-[#0f0f0f] to-transparent w-80 h-full">
          <button
            onClick={() => {
              setranslate((translate: number) => {
                const newTranslate = translate - translateAmount;
                setIsRightVisible(true);
                if (newTranslate <= 0) {
                  setIsLeftVisible(false);
                  setIsRightVisible(true);
                  return 0;
                }
                return newTranslate;
              });
            }}
            className="h-full aspect-square w-auto p-1 rounded-full hover:bg-[rgba(255,255,255,0.2)]"
          >
            <ChevronLeft />
          </button>
        </div>
      )}
      {isRightVisible && (
        <div className="flex justify-end absolute right-0 top-0 bg-gradient-to-l from-[#0f0f0f] to-transparent w-20 h-full">
          <button
            onClick={() => {
              setranslate((translate: number) => {
                if (!scrollContainerRef.current) {
                  return translate;
                }
                console.log(scrollContainerRef, translate);
                const newTranslate = translate + translateAmount;
                setIsLeftVisible(true);
                const edge = scrollContainerRef.current.scrollWidth;
                const width = scrollContainerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  setIsRightVisible(false);
                  return edge - width;
                }
                return newTranslate;
              });
            }}
            className="h-full aspect-square w-auto p-1 rounded-full hover:bg-[rgba(255,255,255,0.2)]"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;
