import {Link} from "react-router-dom";
import ButtonSmall from "../ButtonSmall/ButtonSmall.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {PropsWithChildren} from "react";

export interface MediaCarouselProps {
    title: string,
    totalElements: number,
    range: string,
    nextActive: boolean,
    prevActive: boolean,
    nextPage: () => void,
    prevPage: () => void,
}

export default function MediaCarousel(props: PropsWithChildren<MediaCarouselProps>) {

    return (
        <div className='flex flex-col px-[92px] py-10'>
            <div className='flex justify-between items-center h-10 mb-8'>
                <div className='font-bold text-[32px]'>{props.title}</div>
                <Link to="/" className='font-semibold tracking-[.015em] text-atlantdarkred hover:underline hidden'>See All</Link>
            </div>
            <div className='flex w-[1256px] mb-6'>
                {props.children}
            </div>
            <div className='flex justify-end'>
                <div className='flex items-center mr-4'>
                    Showing
                    <div className='font-semibold mx-1'>{props.range}</div>
                    out of
                    <div className='font-semibold mx-1'>{props.totalElements}</div>
                </div>
                <ButtonSmall onClick={props.prevPage} active={props.prevActive} icon={<FontAwesomeIcon icon={faArrowLeft} />}/>
                <div className='w-4'></div>
                <ButtonSmall onClick={props.nextPage} active={props.nextActive} icon={<FontAwesomeIcon icon={faArrowRight} />}/>
            </div>
        </div>
    )
}