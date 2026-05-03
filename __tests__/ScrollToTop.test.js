import { render } from '@testing-library/react';
import ScrollToTop from '../src/components/ScrollToTop';

describe('ScrollToTop Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ScrollToTop />);
    expect(container).toBeInTheDocument();
  });
});
