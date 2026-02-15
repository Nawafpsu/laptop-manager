import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '20px' }}>
      <Link to="/">Inventory</Link>
      <Link to="/about">About Team</Link>
    </nav>
  );
}
