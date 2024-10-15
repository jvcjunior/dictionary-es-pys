'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { words } from "@/utils/consts";

export default function Home() {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  return (
    <Tabs defaultValue="a" className="flex flex-col gap-8 row-start-2 items-center pt-10">
      <TabsList className='flex items-center justify-start flex-wrap h-auto space-y-1'>
        {alphabet.map(letter => (<TabsTrigger className="px-2 hover:text-green-500" key={letter} value={letter}>{letter.toUpperCase()}</TabsTrigger>))}
      </TabsList>
      {alphabet.map(letter => (<TabsContent value={letter}>
        <main className="flex flex-col gap-8 row-start-2 items-center">
          {words.filter(w => w.description.startsWith(letter)).map(word => (<span key={word.description}>{word.description}</span>))}
        </main >
      </TabsContent>))}
    </Tabs>
  );
}
