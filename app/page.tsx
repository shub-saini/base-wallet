import Appbar from '@/components/Appbar';
import Mnemonics from '@/components/Mnemonics';

export default function Home() {
  return (
    <div className=' flex justify-center'>
      <div className='max-w-6xl w-full'>
        <Appbar />
        <Mnemonics />
      </div>
    </div>
  );
}
