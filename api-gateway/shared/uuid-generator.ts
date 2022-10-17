import { nanoid } from 'nanoid';

export const generateJobID = () => {
    const id = `job_${nanoid(17)}`;
    return JSON.stringify(id);
};