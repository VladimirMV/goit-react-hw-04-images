
import { PropagateLoader } from 'react-spinners';
import './Loader.css';

const Loader = () => {
  console.log("Лоудер стартонул");
  return (
    <div className="Spinner">
      <PropagateLoader
        size="15px"
        color="rgb(225, 212, 167)"
       loading={true}
      />
    </div>
  );
};

export default Loader;