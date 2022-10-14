export const mockEmailSending = (index: number) =>
  new Promise((res, rej) => {
    console.log('Mocking email sending...');
    setTimeout(() => res(index), 1000);
  });
