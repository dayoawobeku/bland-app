import {endOfDay} from 'date-fns';

const initialCount = 3;
const resetTime = endOfDay(new Date());

export {initialCount, resetTime};
