import Form from './components/Form';
import Card from './components/Card';
import { useCallback, useEffect, useState } from 'react';
import { useSocket } from './hooks/useSocket';

const App = () => {
  const [input, setInput] = useState('');
  const [res, setRes] = useState(null);
  const [resArray, setResArray] = useState([]);
  const [blockSending, setBlockSending] = useState(false);
  const [error, setError] = useState('');
  const { message: socketMessage } = useSocket();

  const submitHandler = event => {
    event.preventDefault();
    if (+input % 1 === 0 && !isNaN(+input) && !+input.startsWith('0'))
      if (!blockSending)
        fetch('http://localhost:1554/app', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            amount: input,
          }),
        })
          .then(response => response.json())
          .then(data => {
            setBlockSending(true);
            setRes(data);
          });
      else setError('Email Service Still Running ...');

    setInput(prevState => (prevState = ''));
  };

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setInput(value);
    },
    [setInput]
  );

  useEffect(
    () => async () => {
      const refinedText = socketMessage
        ?.split(':')[2]
        ?.replace(/[^a-z0-9 ]/g, '');
      const arrFromRef = await refinedText?.split(' ');
      if (arrFromRef) {
        if (Number(arrFromRef[0]) + 1 === Number(arrFromRef[2])) {
          setBlockSending(false);
        }
      }
    },
    [socketMessage]
  );

  useEffect(() => {
    if (socketMessage)
      setResArray(prevState => {
        const filterArray = prevState.find(arr => arr.res === null);

        if (filterArray) return [...prevState.filter(x => x.res !== null)];

        const check = prevState.find(x => x.res === res);

        if (check)
          return prevState.map(x => {
            if (x.res === res) {
              return {
                ...x,
                socketMessage: socketMessage,
              };
            }
            return x;
          });

        return [{ socketMessage, res }, ...prevState];
      });
  }, [socketMessage]);

  return (
    <section>
      <div className="main-container">
        <Form
          submitHandler={submitHandler}
          input={input}
          handleChange={handleChange}
        />
        <Card data={resArray} />
        {error !== '' && (
          <div
            style={{
              position: 'absolute',
              padding: '7px 15px',
              backgroundColor: 'brown',
              color: 'whitesmoke',
              bottom: '18px',
              left: '18px',
            }}>
            {error}
          </div>
        )}
        ;
      </div>
    </section>
  );
};

export default App;
