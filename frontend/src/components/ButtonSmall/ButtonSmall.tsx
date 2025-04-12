import {ReactNode} from "react";

export interface ButtonProps {
    icon: ReactNode,
    active: boolean,
    onClick?: () => void,
}

export default function  ButtonSmall({icon, active, onClick}: ButtonProps) {
    return (
        <button className={`flex items-center justify-center h-12 w-12 bg-white border border-atlantpale rounded-lg hover:bg-atlantpale ${!active ? "text-atlantpale hover:bg-white" : ""}`} onClick={active ? onClick : (): void => {}}>
            <div>{icon}</div>
        </button>
    )
}