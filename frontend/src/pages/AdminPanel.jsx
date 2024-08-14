import { useSelector } from "react-redux";
import { Link, Outlet, useOutlet } from "react-router-dom";

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
  return (
<div className='min-h-[calc(100vh-140px)] md:flex hidden w-screen '>

    <aside className='min-h-full w-full max-w-56 bg-white customShadow '>
<div className='h-32 w-full bg-red-800 flex flex-col justify-center cursor-pointer items-center'>
<p className="capitalize font-bold text-lg">{user?.name} </p>
<p className="capitalize">{user?.role} </p>
</div>
{/* ..........nav-link.............. */}

<div>
    <nav className="flex flex-col">
        <Link to = {'all-Users'} className="px-2 py-1 hover:bg-slate-100">all Users</Link>
        <Link to = {'all-Products'} className="px-2 py-1 hover:bg-slate-100">all Products</Link>
    </nav>
</div>
    </aside>

  
  <main className="min-h-full w-full  p-3">
        <Outlet />
    </main>
  

</div>  
)
}

export default AdminPanel