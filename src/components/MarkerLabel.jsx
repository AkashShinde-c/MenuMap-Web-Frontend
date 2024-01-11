const MarkerLabel = ({ text }) => {
    return (
      <div
        style={{
          position: 'absolute',
        //   backgroundColor: 'black',
          color: 'black',
          padding: '2px',
          borderRadius: '5px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {text}
      </div>
    );
  };

  export default MarkerLabel;