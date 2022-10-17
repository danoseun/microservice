import CardComponent from './CardComponent';

const Card = ({ data }) => {
  return (
    <div className="output-container">
      {data.length !== 0 &&
        data.map((jobId, index) => {
          return <CardComponent key={index} jobInfo={jobId} />;
        })}
    </div>
  );
};

export default Card;
