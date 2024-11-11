import { Dispatch, SetStateAction } from "react";

interface Props {
  lists: Array<string[]>;
  currentNumber: Dispatch<SetStateAction<number>>;
}

export default function Pagination({ lists, currentNumber }: Props) {
  const buttonCommonClass = `font-bold text-lg`;
  console.log(currentNumber);
  const changePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    // number型に変更
    return currentNumber(Number(e.currentTarget.value));
  };
  const prevButton = () => {
    // if (currentNumber === 0) return;
    currentNumber((prevState) => {
      return prevState - 1;
    });
  };
  const nextButton = () => {
    // if (currentPage === lists.length - 1) return;
    currentNumber((prevState) => {
      return prevState + 1;
    });
  };
  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-3 justify-center mt-5 items-center">
      <button className={`${buttonCommonClass}`} onClick={prevButton}>
        Prev
      </button>
      <ul className="flex gap-3 justify-center flex-wrap items-center">
        {lists.map((listItem, index) => {
          return (
            <li key={index}>
              <button
                className={` w-[3.125rem] h-[3.125rem] flex items-center justify-center rounded-full  text-white md:hover:bg-green-600`}
                value={index}
                onClick={changePagination}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ul>
      <button className={`${buttonCommonClass}`} onClick={nextButton}>
        Next
      </button>
    </div>
  );
}
