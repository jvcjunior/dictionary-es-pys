'use client'
import React, { useCallback, useEffect, useState } from "react";
import { words } from "@/utils/consts";

export default function Home() {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  // const [selectedLetter, setSelected]
  return (
    <>
      <div>
        <header className="flex flex-col gap-8 row-start-2 items-center">
          PALABRAS
        </header>
        <div className="flex flex-row gap-8 row-start-2 items-center p-12">
          {alphabet.map(letter => (<span key={letter}>{letter}</span>))}
        </div>
        <main className="flex flex-col gap-8 row-start-2 items-center">
          {words.map(word => (<span key={word.description}>{word.description}</span>))}
        </main >
      </div >
    </>
  );
}
