"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [categories, setCategories] = useState<string[]>([]); // カテゴリーを管理するための状態
  const [selectVal, setSelectedVal] = useState("");
  const [lists, setList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!res.ok) {
          throw new Error("リストの取得に失敗しました");
        }
        const data = await res.json();
        // console.log(data);
        const breeds = data.message;
        const categoriesList = Object.keys(breeds);
        setCategories(categoriesList);
      } catch (error) {
        console.error("エラーです:", error);
      }
    }
    fetchData();
  }, []);

  // const doggyTip = {
  //   {
  //     name: "shiba",
  //     jpName: "柴犬",
  //     shiba: "ツンデレない犬です、",
  //   },

  // }

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = e.target.value;
    setSelectedVal(category);
    if (category) {
      // const response = await fetch(
      //   `https://dog.ceo/api/breed/${category}/images/random`
      // );
      const response = await fetch(
        `https://dog.ceo/api/breed/${category}/images`
      );
      const dogData = await response.json();
      const array = dogData.message;
      console.log(array);
      setList(array.slice(0, 20));
    }
  };

  // 配列をシャッフルする関数
  const shuffleButton = () => {
    const shuffledList = [...lists].sort(() => Math.random() - 0.5);
    setList(shuffledList);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-green-100 min-h-screen bg-[url('/dog.svg')] bg-repeat">
      <div className="py-20 max-w-[90%] md:max-w-[80%] w-full flex flex-col gap-3">
        <p className="text-center text-lg">Choose your doggy </p>
        <select className="border p-2" onChange={handleSelectChange}>
          {categories.map((post, index) => (
            <option value={post} key={index}>
              {post}
            </option>
          ))}
        </select>
        <p className="text-center text-2xl font-bold mb-2">
          Your choice doggy<span className="ml-2 ">{selectVal}</span>
        </p>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {lists.map((list, index) => (
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
          ))}
        </ul>
        {selectVal && (
          <p className="text-center font-bold text-lg">
            Did you find your favorite doggy?
          </p>
        )}
        <button
          onClick={shuffleButton}
          className="bg-green-900 text-white p-3 rounded-md w-full md:max-w-[21.875rem] mx-auto"
        >
          Want see more pics?
        </button>
      </div>
    </div>
  );
}
