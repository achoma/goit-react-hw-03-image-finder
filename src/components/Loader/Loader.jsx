import { ThreeCircles } from 'react-loader-spinner';
import { Container } from 'components/Container/Container';

export const Loader = () => {
  return (
    <Container>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Container>
  );
};
