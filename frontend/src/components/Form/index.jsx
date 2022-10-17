const Form = ({ input, handleChange, submitHandler }) => {
  return (
    <div className="input-container">
      <form onSubmit={submitHandler} id="form">
        <input
          value={input}
          onChange={handleChange}
          type="text"
          name="input"
          placeholder="Enter Number here"
        />
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
