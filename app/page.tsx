'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { words } from "@/utils/consts";
import { Word } from "@/types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWord, setCurrentWord] = useState<Word>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setCurrentWord(undefined);
      setNotFound(false);
    }
  }, [searchTerm])

  const onChangeSearchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm])

  const onSubmit = useCallback(() => {
    const word = words.find(word => word.description.toLowerCase().includes(searchTerm))
    if (word) {
      setCurrentWord(word)
    } else {
      setNotFound(true)
    }
  }, [words, searchTerm])


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Dictionario español - lenguage de señas paraguaya</h1>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Buscar..." onChange={onChangeSearchTerm} />
          <Button onClick={onSubmit}>Buscar</Button>
        </div>
        {currentWord ? <iframe
          className="w-full aspect-video self-stretch md:min-h-96"
          src={`https://www.youtube.com/embed/${currentWord.videoId}`}
          frameBorder="0"
          title="Product Overview Video"
          aria-hidden="true"
        /> : null}
        {notFound ? "No hay esse video" : null}

      </main>
    </div>
  );
}
