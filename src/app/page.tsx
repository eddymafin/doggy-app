"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [categories, setCategories] = useState([]); // カテゴリーを管理するための状態
  const [selectVal, setSelectedVal] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!res.ok) {
          throw new Error("リストの取得に失敗しました");
        }
        const data = await res.json();
        console.log(data);
        const breeds = data.message;
        const categoriesList = Object.keys(breeds);
        setCategories(categoriesList);
      } catch (error) {
        console.error("エラーです:", error);
      }
    }
    fetchData();
  }, []);

  const handleSelectChange = async (e) => {
    const category = e.target.value;
    setSelectedVal(category);
    if (category) {
      const response = await fetch(
        `https://dog.ceo/api/breed/${category}/images/random`
      );
      const data = await response.json();
      console.log(data);
      console.log(data.message);
      setImageUrl(data.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-green-100 min-h-screen">
      <div className="mt-10 max-w-[30%] w-full flex flex-col gap-3">
        <p className="text-center text-lg">Choose your doggy </p>
        <select className="border p-2" onChange={handleSelectChange}>
          {categories.map((post) => (
            <option value={post} key={post.id}>
              {post}
            </option>
          ))}
        </select>
        <p className="text-center text-2xl font-bold mb-2">
          Your choice doggy<span className="ml-2 ">{selectVal}</span>
        </p>
        <div className="flex items-center justify-center overflow-hidden h-full">
          <Image
            src={imageUrl}
            alt={selectVal}
            className="w-full object-cover  max-w-[18.75rem] max-h-[18.75rem]"
            width={200}
            height={200}
            loading="lazy"
          />
        </div>
        {selectVal && <p className="text-center">You like it?</p>}
      </div>
    </div>
  );
}
