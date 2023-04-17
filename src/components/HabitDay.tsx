import { ProgressBar } from './ProgressBar';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HabitList } from './HabitList';
import { useContext, useState } from 'react';
import { SummaryContext } from '../context/SummaryContext';

interface HabitDayProps{
    date: Date
    defaultCompleted?: number
    amount?: number
}

export function HabitDay({defaultCompleted = 0, amount = 0, date}: HabitDayProps){

    const { summary, setSummary } = useContext(SummaryContext);
    const [completedHabits, setCompletedHabits] = useState(defaultCompleted);
    
    const completedPercentage = amount > 0 ? Math.round(completedHabits/amount * 100): 0;
    const weekDayNumerical = dayjs(date).format('DD/MM');    
    const weekDayWord = dayjs(date).format('dddd');

    function updateCompleted( amount: number, completed: number, id: string)
    {
        setCompletedHabits(completed)
        let summaryElementIndex = summary.findIndex(element => (dayjs(date).isSame(element.date, 'day')));
        if(summaryElementIndex === -1)
        {   
            const newSummaryElement = {
                id,
                date: date.toISOString(),
                amount,
                completed
            }
            setSummary([...summary, newSummaryElement]);
        }
        else {
            const updatedSummary = [...summary];
            updatedSummary[summaryElementIndex] = {
              ...summary[summaryElementIndex],
              completed,
            };
            setSummary(updatedSummary);
        }
        
    }
    

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx("w-10 h-10  rounded-lg transition-colors",
                {
                    "bg-zinc-900 border-zinc-800 ": completedPercentage == 0,
                    "bg-violet-900 border-violet-700 ": completedPercentage > 0 && completedPercentage < 20,
                    "bg-violet-800 border-violet-600 ": completedPercentage >= 20 && completedPercentage < 40,
                    "bg-violet-700 border-violet-500 ": completedPercentage >= 40 && completedPercentage < 60,
                    "bg-violet-600 border-violet-500 ": completedPercentage >= 60 && completedPercentage < 80,
                    "bg-violet-500 border-violet-400 ": completedPercentage >= 80

                })} 
            />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <span className='font-semibold to-zinc-400'>{weekDayWord}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{weekDayNumerical}</span>

                    <ProgressBar progress={completedPercentage} />
                    
                    <HabitList date={date} onCompletedChange={updateCompleted}/>

                    <Popover.Arrow className='fill-zinc-900' width={16} height={8} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}