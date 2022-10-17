const CardComponent = ({ jobInfo }) => {
  const refinedText = jobInfo?.socketMessage
    ?.split(':')[2]
    ?.replace(/[^a-z0-9 ]/g, '');
  return (
    <div className="job-id-container">
      <h4 className="job-id">{jobInfo.res}</h4>
      <span className="amount">{refinedText}</span>
    </div>
  );
};

export default CardComponent;
