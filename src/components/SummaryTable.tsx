import { generateDaysFromYearBegining } from "../utils/generate-days-from-year-begining";
import { HabitDay } from "./HabitDay";

const weekDays = ['D','S','T','Q','Q','S','S'];

const summaryDates = generateDaysFromYearBegining();
const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {
                    weekDays.map((day, index) =>{
                        return(
                        <div key={`${index}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {day}
                        </div>
                    )}
                    )
                }
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                   summaryDates.map((day) =>(
                       <HabitDay 
                            key={day.toString()}
                            amount={10} 
                            completed={10}
                        />
                   ))
                }
                {
                   amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map(( _, index)=>{
                       return (
                           <div key={index} className="w-10 h-10 bg-zinc-900 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed " /> 
                       )
                   })
                }
            </div>
        </div>
    )
}