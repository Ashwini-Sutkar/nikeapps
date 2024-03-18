import {headerLogo} from '../assets/images';
import {hamburger} from '../assets/icons';
import { navLinks } from '../constants';

const Nav = () => {
  // Retrieve user data from local storage
const userDataString = localStorage.getItem('userData');
const userData = JSON.parse(userDataString);
 console.log(userData);

// Now you can use userData.name, userData.email, userData.id, etc. as needed

  return (
  
    <header className='padding-x py-8 absolute z-10 w-full'>
     <h1 className='font-bold mr-4 text-[20px]'>Welcome, {userData.name}!</h1>
        <nav className='flex justify-between items-center max-container'>
            <a href="/">
                <img src={headerLogo} alt="Logo" width={130} height={29} className='mt-4' />
            </a>
            <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
              {navLinks.map((item)=>(
                <li key={item.label}>
                  <a href={item.href} 
                  className='font-monserrat leading-normal text-lg text-slate-gray'>
                     {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className='hidden max-lg:block'>
            <img src={hamburger} alt="hamburger" width={25} height={25} />

            </div>
        </nav>
       
    </header>
  )
}

export default Nav
