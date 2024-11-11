"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Pagination from "./component/Pagination";

export default function Page() {
  const [categories, setCategories] = useState<string[]>([]); // カテゴリーを管理するための状態
  const [selectVal, setSelectedVal] = useState("");
  const [lists, setList] = useState<Array<string[]>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const buttonCommonClass = `font-bold text-lg`;

  useEffect(() => {
    // axiosの記述に変更
    const fetchData = async () => {
      const apiUrl = "https://dog.ceo/api/breeds/list/all";
      const result = await axios
        .get(apiUrl)
        .then((response) => {
          return response.data;
          // console.log(response.data);
        })
        .catch((error) => {
          console.error("エラーです:", error);
        });

      const breeds = result.message;
      // console.log(breeds);
      const categoriesList = Object.keys(breeds);
      setCategories(categoriesList);
    };
    fetchData();
  }, []);

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = e.target.value;
    setSelectedVal(category);
    if (category) {
      setIsLoading(true);
      const categoryUrl = `https://dog.ceo/api/breed/${category}/images`;

      const dogData = await axios
        .get(categoryUrl)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.error("エラーです", error);
        });
      const array = dogData.message;
      // setList(array.slice(0, 20));
      // setList(array);

      // 20ごとに配列を再分配
      const paginatedArray: Array<string[]> = [];
      for (let i = 0; i < array.length; i += 20) {
        paginatedArray.push(array.slice(i, i + 20));
      }
      // setList(array);
      setList(paginatedArray);
      setCurrentPage(0);
      setIsLoading(false);
    }
  };

  // 配列をシャッフルする関数
  // const shuffleButton = () => {
  //   const shuffledList = [...lists].sort(() => Math.random() - 0.5);
  //   setList(shuffledList);
  // };

  const changePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    // number型に変更
    const pageNumber: number = Number(e.currentTarget.value);
    console.log(pageNumber);
    setCurrentPage(pageNumber);
  };

  const prevButton = () => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  };
  const nextButton = () => {
    if (currentPage === lists.length - 1) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-green-100 min-h-screen bg-[url('/dog.svg')] bg-repeat">
      <div className="py-20 max-w-[90%] md:max-w-[80%] w-full flex flex-col gap-3">
        <p className="text-center text-lg">Choose your doggy </p>
        <select className="border p-2" onChange={handleSelectChange}>
          <option value=""></option>
          {categories.map((post, index) => (
            <option value={post} key={index}>
              {post}
            </option>
          ))}
        </select>
        <p className="text-center text-2xl font-bold my-3">
          Your choice doggy is..{" "}
          <span className={`ml-2  p-3 ${selectVal ? "bg-white" : ""}`}>
            {selectVal}
          </span>
        </p>

        {selectVal && (
          <div className="flex flex-col gap-3 mt-5">
            <p className="text-center font-bold text-lg">
              Did you find your favorite doggy?
            </p>
            {/* <button
              onClick={shuffleButton}
              className="bg-green-900 text-white p-3 rounded-md w-full md:max-w-[21.875rem] mx-auto"
            >
              Want to see more pics?
            </button> */}
          </div>
        )}

        {/* <Pagination lists={lists} currentNumber={currentPage} /> */}
        {isLoading ? (
          <p className="text-center font-bold py-5">Now Loading...</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {lists[currentPage]
              ? lists[currentPage].map((list, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center md:max-w-[18.75rem]  border-none overflow-hidden bg-white"
                  >
                    <Image
                      src={list}
                      alt={`Dog ${index}`}
                      className="w-auto object-contain h-[9.375rem]"
                      width={150}
                      height={150}
                      loading="lazy"
                    />
                  </li>
                ))
              : null}
          </ul>
        )}
        {selectVal && (
          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 justify-center mt-5 items-center">
            <button
              className={`${buttonCommonClass} ${
                currentPage === 0 ? "opacity-30" : ""
              }`}
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
                        currentPage === index ? "bg-green-600" : "bg-green-900"
                      } w-[3.125rem] h-[3.125rem] flex items-center justify-center rounded-full  text-white md:hover:bg-green-600`}
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
              className={`${buttonCommonClass} ${
                currentPage === lists.length - 1 ? "opacity-30" : ""
              }`}
              onClick={nextButton}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
