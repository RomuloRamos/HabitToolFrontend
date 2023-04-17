import React, { createContext, useState } from 'react';


export interface Summary {
    id: string;
    date: string;
    amount: number;
    completed: number;
};

interface SummaryContextData {
  summary: Summary[];
  setSummary: React.Dispatch<React.SetStateAction<Summary[]>>;
}

export const SummaryContext = createContext<SummaryContextData>({
  summary: [],
  setSummary: () => {}
});

