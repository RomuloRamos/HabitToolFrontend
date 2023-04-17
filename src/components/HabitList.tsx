import * as Checkbox from '@radix-ui/react-checkbox';
import {Check} from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

interface HabitListProps {
    date: Date;
    onCompletedChange: (amount: number, completed:number, id:string)=> void
}

interface HabitsInfo {
    possibleHabits:
	{
		id: string,
		title: string,
		create_at: string
	}[],
	completedHabits: string []
}

export function HabitList({date, onCompletedChange}:HabitListProps){

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>({possibleHabits:[], completedHabits:[]})
    const dayToSeach = dayjs(date).format('YYYY-MM-DD');
    
    useEffect(()=>{
        api.get('/day',{
            params:{
                date: dayToSeach
            }
        }).then((response) =>{
            setHabitsInfo(response.data);
        });
    },[]);


    async function handleToggleHabit(habitId: string){

        try {
            const toggleResponse = await api.patch(`/habits/${dayToSeach}/${habitId}/toggle`);
            // console.log("toggleResponse: ", toggleResponse.data);
    
            let newCompletedHabits:string [] = [];
            if(toggleResponse.data.toggle === 1)
            {
                newCompletedHabits = [...habitsInfo.completedHabits, habitId];
            }
            else{
                newCompletedHabits = habitsInfo.completedHabits.filter(id => id !== habitId);
            }
            setHabitsInfo(prevState => ({...prevState, completedHabits: newCompletedHabits}));
            
            onCompletedChange(habitsInfo.possibleHabits.length,newCompletedHabits.length, habitId); 
            
        } catch (error) {
            console.log(error);
            alert('Ops, falha na conexão com o servidor');
        }
    }

    return(
        <div className='mt-6 flex flex-col gap-3'>
            { 
                habitsInfo?.possibleHabits.length === 0?
                (
                <span
                    className='max-w-xs flex items-center gap-3 font-semibold text-xl text-white leading-tight'//acessa a propriedade state checked/unchecked do componente Indicator para riscar as palavras dependendo do estado
                >
                    Não há hábitos registrados para hoje, aproveite seu dia :)
                </span>)
                :           
                habitsInfo?.possibleHabits.map(habit=>{
                   
                    return (
                        <Checkbox.Root
                            className='flex items-center gap-3 group' //group Permite que elementos dentro desse componente possam acessar estados um do outro
                             key={habit.id}
                             onCheckedChange={()=>{handleToggleHabit(habit.id)}}
                             checked={habitsInfo.completedHabits.includes(habit.id)}
                        >
                            <div
                                className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 transition-colors'//acessa a propriedade state checked/unchecked do componente Indicator para mudar do bg dependendo do estado
                            >
                                <Checkbox.Indicator className='bg-green-500'>
                                    <Check
                                        size={20}
                                        className='text-white'
                                    />
                                </Checkbox.Indicator>
                            </div>
                            <span
                                className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'//acessa a propriedade state checked/unchecked do componente Indicator para riscar as palavras dependendo do estado
                            >
                                {habit.title}
                            </span>
                        </Checkbox.Root>
                    )
                })
            }
        </div>
    );
}