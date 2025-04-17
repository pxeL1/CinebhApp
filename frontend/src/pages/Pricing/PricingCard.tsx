import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export interface PricingProps {
  type: string;
  price: string;
  descriptions: string[];
}

export default function PricingCard({
  type,
  price,
  descriptions,
}: PricingProps) {
  return (
    <div className="flex flex-col h-[564px] w-[408px] border border-cinebhpale rounded-xl ml-4 pt-8 hover:h-[644px] hover:pt-[72px] hover:border-cinebhash transition-all duration-300 group">
      <div className="flex justify-center text-xl font-bold mb-6">{type}</div>
      <div className="flex justify-center text-3xl font-bold mb-6 group-hover:text-cinebhdarkred">
        {price}
      </div>
      <div className="flex justify-center mb-8">*per ticket</div>
      {descriptions.map((item) => (
        <div className="ml-6 mb-6">
          <span className="text-cinebharkred mr-4">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {item}
        </div>
      ))}
      <div className="flex justify-center">
        <button className="w-36 h-12 border text-cinebhdarkred rounded-lg cursor-pointer mt-8 hover:bg-cinebhdarkred hover:text-white hidden">
          Explore movies
        </button>
      </div>
    </div>
  );
}
