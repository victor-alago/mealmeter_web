import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      // ... existing links ...
      <Link to="/log-food">Log Food</Link>
    </nav>
  );
};

export default Navbar; 