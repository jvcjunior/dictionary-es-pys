'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { words as possibleWords } from "@/utils/consts";
import { Word } from "@/types";
import Vimeo from '@u-wave/react-vimeo';
import Link from "next/link";
import { getCanonicalString } from "@/utils/helpers";
import { navigationMenuTriggerStyle, NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWords, setCurrentWords] = useState<Word[]>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setCurrentWords(undefined);
      setNotFound(false);
    }
  }, [searchTerm])

  const onChangeSearchTerm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, [setSearchTerm])

  const onSubmit = useCallback(() => {
    const words = searchTerm ? possibleWords.filter(word => {
      return getCanonicalString(word.description).includes(getCanonicalString(searchTerm))
    }) : [];
    if (words?.length) {
      setCurrentWords(words)
      setNotFound(false)
    } else {
      setCurrentWords(undefined)
      setNotFound(true)
    }
  }, [possibleWords, searchTerm])


  return (
    <>
      <div className="flex justify-center items-center justify-items-center p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Inicio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/categories" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Categorias
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/palabras" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Palabras
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/frases" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Frases
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <h1 className="text-center text-2xl">Dictionario español - lenguage de señas paraguaya</h1>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Buscar..." onChange={onChangeSearchTerm} onKeyPress={e => {
              if (e.key === 'Enter') {
                onSubmit();
              }
            }} />
            <Button onClick={onSubmit}>Buscar</Button>
          </div>
          {currentWords?.map(cw =>
            <div className="min-h-64 max-h-80" style={{ width: '100%', height: '320px' }}>
              {cw.type === "vimeo" ?
                <iframe
                  className="w-full h-full aspect-video self-stretch"
                  src={`https://player.vimeo.com/video/${cw.videoId}?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                  frameBorder="0"
                  title="Product Overview Video"
                  aria-hidden="true"
                />
                : null
              }
              {cw.type === "youtube" ?
                <iframe
                  className="w-full h-full aspect-video self-stretch"
                  src={`https://www.youtube.com/embed/${cw.videoId}`}
                  frameBorder="0"
                  title="Product Overview Video"
                  aria-hidden="true"
                />
                : null
              }
            </div>
          )}

          {notFound ? "No hay esse video" : null}
        </main >
        <footer className="row-start-3">
          <span>Tenemos <Link href="/palabras"><span style={{ color: 'blue' }}>{possibleWords.length} palabras</span></Link> registradas.</span>
        </footer>
      </div >
    </>
  );
}
