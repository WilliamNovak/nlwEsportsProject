import { useState, useEffect } from 'react'
import { Check, CaretDown, CaretUp } from 'phosphor-react';
import * as Select from '@radix-ui/react-select'

interface Game {
    id: string,
    title: string
}

export function SelectGames () {
    const [games, setGames] = useState<Game[]>([])
  
    useEffect(() => {
        fetch('http://localhost:3333/games')
        .then(response => response.json())
        .then(data => {
            setGames(data)
        })
    }, [])
    

    return (
        <Select.Root>
            <Select.Trigger className='bg-zinc-900 py-3 px-4 flex justify-between rouded text-sm placeholder:text-zinc-500 items-center'>
                <Select.Value placeholder='Selecione o game que deseja jogar'/>
                <Select.Icon>
                    <CaretDown/>
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal id='game'>
                <Select.Content className='bg-zinc-900 text-zinc-300 rounded-sm overflow-hidden'>
                    <Select.ScrollUpButton>
                        <CaretUp />
                    </Select.ScrollUpButton>
                        <Select.Viewport className='p-2'>
                            { games.map(game => {
                                return (
                                    <Select.Item key={game.id} value={game.id} className="flex items-center relative p-4 h-6 leading-none rounded-sm hover:bg-zinc-700">
                                        <Select.ItemText>{game.title}</Select.ItemText>
                                        <Select.ItemIndicator className='p-1'>
                                            <Check />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                )
                            })}
                        </Select.Viewport>
                    <Select.ScrollDownButton>
                        <CaretDown />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}