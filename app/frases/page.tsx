'use client'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { words as possibleWords } from "@/utils/consts";
import { SelectedOptionWord, Word } from "@/types";
import Link from "next/link";
import MultipleSelector, { Option } from '@/components/ui/multi-selector';
import { navigationMenuTriggerStyle, NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { getCanonicalString } from "@/utils/helpers";
import { filter } from "lodash";

export default function Home() {
    const [currentOptions] = useState<SelectedOptionWord[]>(possibleWords.map((word, index) => ({ label: word.description, value: word.description, myId: word.videoId })));
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptionWord[]>([]);
    const [currentWords, setCurrentWords] = useState<Word[]>();
    const [notFound, setNotFound] = useState(false);

    const onSubmit = useCallback(() => {
        const optionsValues = selectedOptions.map((option) => option.myId)
        const words = possibleWords.filter(word => {
            return optionsValues.includes(word.videoId)
        });
        if (words?.length) {
            setCurrentWords(words)
            setNotFound(false)
        } else {
            setCurrentWords(undefined)
            setNotFound(true)
        }
    }, [possibleWords, selectedOptions])

    const onSelect = useCallback((options: SelectedOptionWord[]) => {
        setSelectedOptions(options);
    }, [setSelectedOptions])

    const options = useMemo(() => {
        return possibleWords.map((word, index) => ({ label: word.description, value: word.description, myId: word.videoId }))
    }, [possibleWords])

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
                    <h1 className="text-center text-2xl">Frases - Selecione multiplas palavras y busque su frase</h1>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <MultipleSelector
                            defaultOptions={options}
                            options={currentOptions}
                            onChange={onSelect}
                            // onSearchSync={onSearchSync}
                            placeholder="Selecione las palabras que desea buscar..."
                            emptyIndicator={
                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                    no results found.
                                </p>
                            }
                        />
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
