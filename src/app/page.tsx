"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function Page() {
  const [categories, setCategories] = useState<string[]>([]); // カテゴリーを管理するための状態
  const [selectVal, setSelectedVal] = useState("");
  const [lists, setList] = useState<Array<string[]>>([]);
  const [currentPage, setCurrentPage] = useState(0);

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
        <ul className="flex gap-3 justify-center mt-5">
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
        <ul className="flex gap-3 justify-center mt-5">
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
      </div>
    </div>
  );
}
