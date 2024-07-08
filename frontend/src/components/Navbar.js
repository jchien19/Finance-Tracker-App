import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className='bg-white p-3 flex'>
        <h1 className='text-5xl text-purple-800 font-bold'>Website</h1>
        <div className='flex absolute left-1/2 transform -translate-x-1/2 gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-gray-300'>
            <Link className='top-1/2' to='/home'>
                <p>Home</p>
            </Link>
            <div className='border border-l border-gray-300'></div>
            <Link className='top-1/2' to='/'>
                <p>Account</p>
            </Link>
            <div className='border border-l border-gray-300'></div>
            <Link className='top-1/2' to='/register'>
                <p>About</p>
            </Link>
        </div>
        {/* <div className='absolute transform right-5 gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-gray-300'>
            <Link className='top-1/2' to='/'>
                <p className='material-symbols-outlined'>account_circle</p>
            </Link>
        </div> */}
        <div className='absolute right-5 border border-gray-300 gap-2 rounded-full py-1 px-2'>
            <Link to='/'>
                <p className='material-symbols-outlined'>account_circle</p>
            </Link>
        </div>
    </div>
  )

}

export default Navbar