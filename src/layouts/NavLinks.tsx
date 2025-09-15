import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
    const links = [
        { name: 'Home', url: '/' },
        { name: 'Find Job', url: '/find-job' },
        { name: 'Find Talents', url: '/find-talents' },
        { name: 'Post Job', url: '/post-job/0' },
        { name: 'Posted Job', url: '/posted-job/0' },
        { name: 'Job History', url: '/job-history' },
    ]

    const location = useLocation();
    return (
        <div className='flex gap-4 items-center text-white'>
            {
                links.map((link, index) => (
                    <div key={index} className={`${location.pathname === link.url ? 'border-yellow-400 text-yellow-200' : ''} border-b-[3px] h-full flex items-center`}>
                        <Link to={link.url}>{link.name}</Link>
                    </div>
                ))
            }
        </div>
    );
}

export default NavLinks;