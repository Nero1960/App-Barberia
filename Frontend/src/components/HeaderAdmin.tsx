import useAuth from "../hooks/useAuth"

function HeaderAdmin() {

    const { auth } = useAuth();
    return (
        <header className=" md:px-10 py-6 mt-6 md:mt-0 bg-black-500 flex justify-between items-center">
            <h1 className="text-white font-Heading text-lg hidden md:block md:justify-center"></h1>

            <div className="flex w-full md:w-auto flex-col justify-center md:flex-row gap-x-2 items-center space-y-3 md:space-y-0">
                <div className="flex justify-center">
                    <img className="rounded-full w-20 h-20 mx-auto md:w-10 md:h-10 object-cover" src={`${import.meta.env.VITE_BASE_IMAGE}/${auth?.imagen}`} alt="imagen admin" />
                </div>

                <div className="flex flex-col space-y-1 text-dark-200 text-center md:text-left">
                    <p className="font-bold text-sm">{auth?.nombre} {" "} {auth?.apellido}</p>
                    <p className="text-xs">Administrador</p>
                </div>

            </div>

        </header> 
    ) 
}

export default HeaderAdmin