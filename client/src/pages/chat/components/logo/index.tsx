const Logo = () => {
    return ( 
        <div className="flex p-5 justify-start items-center gap-2">
            <img src="./src/assets/logo.svg" className="w-[40px]" alt="" />
            <h1 className="text-2xl poppins-medium bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">TalkFlow</h1>
        </div>
     );
}
 
export default Logo;