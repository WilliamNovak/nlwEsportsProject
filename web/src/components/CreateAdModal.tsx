import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

import { Check, GameController, CaretDown, CaretUp } from 'phosphor-react';

import * as Select from '@radix-ui/react-select'
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox'
import * as TouggleGroup from '@radix-ui/react-toggle-group'

import { Input } from './Form/Input';
import { SelectGames } from './SelectGames';

interface Game {
    id: string,
    title: string
}

export function CreateAdModal () {
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    const [games, setGames] = useState<Game[]>([])
    const [selectedGame, setSelectedGame] = useState(String)

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])
    
    async function handleCreateAd(event: FormEvent){
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if(!data.name){
            return;
        }

        try {
          await axios.post(`http://localhost:3333/games/${selectedGame}/ads`,{
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel
          })

          alert('Anúncio criado com sucesso!')
        } catch(err) {
          console.log(err);
          alert('Erro ao criar anúncio!')
        }
    }

    return (
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

            <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <Select.Root onValueChange={setSelectedGame}>
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
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name="name" id="name" placeholder='Como te chamam dentro do game?' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input name="yearsPlaying" id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO'/>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input type="text" name="discord" id="discord" placeholder='Usuario#0000' />
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <TouggleGroup.Root 
                    type='multiple' 
                    className='grid grid-cols-4 gap-2'
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <TouggleGroup.Item
                      value="0"
                      title='Domingo'
                      className={`w-8 h-8 rouded ${weekDays.includes("0") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      D
                    </TouggleGroup.Item>
                    <TouggleGroup.Item
                      value="1" 
                      title='Segunda'
                      className={`w-8 h-8 rouded ${weekDays.includes("1") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </TouggleGroup.Item>
                    <TouggleGroup.Item
                      value="2" 
                      title='Terça'
                      className={`w-8 h-8 rouded ${weekDays.includes("2") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      T
                    </TouggleGroup.Item>
                    <TouggleGroup.Item
                      value="3" 
                      title='Quarta'
                      className={`w-8 h-8 rouded ${weekDays.includes("3") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      Q
                    </TouggleGroup.Item>
                    <TouggleGroup.Item
                      value="4" 
                      title='Quinta'
                      className={`w-8 h-8 rouded ${weekDays.includes("4") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      Q
                    </TouggleGroup.Item>
                    <TouggleGroup.Item
                      value="5" 
                      title='Sexta'
                      className={`w-8 h-8 rouded ${weekDays.includes("5") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </TouggleGroup.Item>
                    <TouggleGroup.Item
                      value="6" 
                      title='Sábado'
                      className={`w-8 h-8 rouded ${weekDays.includes("6") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </TouggleGroup.Item>
                  </TouggleGroup.Root>
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input type="time" name='hourStart' id="hourStart" placeholder='De' />
                    <Input type="time" name='hourEnd' id="hourEnd" placeholder='Até' />
                  </div>
                </div>
              </div>

              <label className='mt-2 flex items-center gap-2 text-sm'>
                <Checkbox.Root 
                    className='w-6 h-6 p-1 rouded bg-zinc-900'
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                        if(checked === true) {
                            setUseVoiceChannel(true)
                        } else {
                            setUseVoiceChannel(false)
                        }
                    }}
                >
                    <Checkbox.Indicator>
                        <Check className='w-4 h-4 text-emerald-400'/>
                    </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close 
                  type='button'
                  className='bg-zinc-500 px-5 h-12 rouded-md font-semibold hover:bg-zinc-600'
                >
                  Cancelar
                </Dialog.Close>
                <button 
                  type="submit"
                  className='bg-violet-500 px-5 h-12 rouded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                >
                  <GameController className='w-6 h-6'/>
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
    );
}