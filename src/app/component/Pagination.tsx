import { Dispatch, SetStateAction } from "react";

interface Props {
  lists: Array<string[]>;
  currentNumber: number; // 現在のページ番号を受け取る
  setCurrentNumber: Dispatch<SetStateAction<number>>;
}

export default function Pagination({
  lists,
  currentNumber,
  setCurrentNumber,
}: Props) {
  const buttonCommonClass = `font-bold text-lg disabled:opacity-30`;
  console.log(lists);
  const changePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    // number型に変更
    return setCurrentNumber(Number(e.currentTarget.value));
  };
  const prevButton = () => {
    if (currentNumber === 0) return;
    setCurrentNumber((currentNumber) => {
      return currentNumber - 1;
    });
  };
  const nextButton = () => {
    if (currentNumber === lists.length - 1) return;
    setCurrentNumber((currentNumber) => {
      return currentNumber + 1;
    });
  };
  return (
    <div className="grid grid-cols-[1fr,auto,1fr] gap-3 justify-center mt-5 items-center">
      <button
        className={buttonCommonClass}
        disabled={currentNumber === 0}
        onClick={prevButton}
      >
        Prev
      </button>
      <ul className="flex gap-3 justify-center flex-wrap items-center">
        {lists.map((listItem, index) => {
          return (
            <li key={index}>
              <button
                className={`${
                  currentNumber === index ? "bg-green-600" : "bg-green-900"
                } w-[2.5rem] h-[2.5rem] md:w-[3.125rem] md:h-[3.125rem] flex items-center justify-center rounded-full  text-white md:hover:bg-green-600`}
                value={index}
                onClick={changePagination}
              >
                {index + 1}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className={buttonCommonClass}
        disabled={currentNumber === lists.length - 1}
        onClick={nextButton}
      >
        Next
      </button>
    </div>
  );
}
