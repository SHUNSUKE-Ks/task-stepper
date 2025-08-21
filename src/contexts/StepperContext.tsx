import React, { createContext, useContext, ReactNode } from 'react';
import { usePersistentReducer } from '@/hooks/usePersistentReducer';

export type Stepper = {
  id: string;
  title: string;
  progress?: number; // Optional progress for display
};

type StepperState = {
  steppers: Stepper[];
};

type StepperAction =
  | { type: 'ADD_STEPPER'; payload: { title: string } }
  | { type: 'DELETE_STEPPER'; payload: string } // id
  | { type: 'LOAD_STEPPERS'; payload: StepperState };

const initialStepperState: StepperState = {
  steppers: [
    { id: 'S01', title: '仕様確定', progress: 40 },
    { id: 'S02', title: 'UIスケッチ', progress: 10 },
    { id: 'S03', title: '技術選定', progress: 80 },
  ],
};

const stepperReducer = (state: StepperState, action: StepperAction): StepperState => {
  switch (action.type) {
    case 'ADD_STEPPER':
      const newStepper: Stepper = {
        id: `S${Date.now()}`,
        title: action.payload.title,
        progress: 0,
      };
      return { ...state, steppers: [...state.steppers, newStepper] };
    case 'DELETE_STEPPER':
      return {
        ...state,
        steppers: state.steppers.filter(stepper => stepper.id !== action.payload),
      };
    case 'LOAD_STEPPERS':
      return { ...action.payload };
    default:
      return state;
  }
};

type StepperContextType = {
  stepperState: StepperState;
  stepperDispatch: React.Dispatch<StepperAction>;
  stepperLoading: boolean;
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const StepperProvider = ({ children }: { children: ReactNode }) => {
  const [stepperState, stepperDispatch, stepperLoading] = usePersistentReducer(
    stepperReducer,
    initialStepperState,
    'stepper-list-state' // Unique storage key for the stepper list
  );

  return (
    <StepperContext.Provider value={{ stepperState, stepperDispatch, stepperLoading }}>
      {children}
    </StepperContext.Provider>
  );
};

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (context === undefined) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
};
