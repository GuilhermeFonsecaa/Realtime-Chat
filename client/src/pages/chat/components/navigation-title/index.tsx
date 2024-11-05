const NavigationTitle = ({ text }: { text: string }) => {
    return (
        <div className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
            {text}
        </div>
    );
}

export default NavigationTitle;