import PropTypes from 'prop-types';
import { RingLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <RingLoader size={100} color='red' /> 
    </div>
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};

export default LoadingSpinner;
