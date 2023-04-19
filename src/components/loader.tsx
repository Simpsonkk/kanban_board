import { CSSProperties } from 'react';
import { SpinnerDotted } from 'spinners-react';

function Loader(): JSX.Element {
  const spinnerStyles: CSSProperties = {
    marginTop: '70px',
  };

  return <SpinnerDotted color="#4481c3" style={spinnerStyles} size={100} />;
}

export default Loader;
