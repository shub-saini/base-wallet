import ThemeToggle from './ThemeToggle';

function Appbar() {
  return (
    <div className='flex justify-between items-center p-4 mb-6'>
      <div className='font-extrabold text-3xl'>Wallet</div>
      <ThemeToggle />
    </div>
  );
}

export default Appbar;
