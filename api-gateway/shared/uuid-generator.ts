import { nanoid } from 'nanoid';

export const generateJobID = (prefix='job') => {
    const id = nanoid(31);
    return `${prefix}_${id}`;
};