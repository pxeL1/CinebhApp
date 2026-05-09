import ProgressBar from "pages/Admin/ProgressBar";
import Button, { ButtonType } from "components/common/Button/Button";
import { Step } from "pages/Admin/AddMovie";
import { Personnel } from "models/Personnel";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useContext, useState } from "react";
import Papa, { ParseResult } from "papaparse";
import { MovieContext } from "contexts/MovieContext/MovieContext";
import { defaultImage } from "defaultValues";
import { ref, uploadString, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";
import { storage } from "firebase/firebase";

export interface DetailsProps {
  setFormStep: (step: Step) => void;
}

export default function Details({ setFormStep }: DetailsProps) {
  const movieContext = useContext(MovieContext);
  const [writers, setWriters] = useState<Array<Personnel>>([]);
  const [cast, setCast] = useState<Array<Personnel>>([]);
  const [images, setImages] = useState<Array<ImageModel>>([
    {image: defaultImage, isCoverPhoto: false},
    {image: defaultImage, isCoverPhoto: false},
    {image: defaultImage, isCoverPhoto: false},
    {image: defaultImage, isCoverPhoto: false}
  ]);


  function handleSaveToDrafts() {
    const newPersonnel = [...writers, ...cast];
    movieContext.setPersonnel([...movieContext.personnel, ...newPersonnel]);

    const uploadImages = images.filter((image) => image.image !== defaultImage);
    uploadImages.forEach((image, index) => {
      const storageRef = ref(storage, `images/${v4()}`)
      uploadString(storageRef, image.image, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const newImages = movieContext.images;
          newImages.push({url: url, coverPhoto: image.isCoverPhoto});
          movieContext.setImages(newImages);

          if(index === uploadImages.length - 1) {
            movieContext.handleSubmit();
          }
        })
      })
    })
  }

  return (
    <>
      <div className="p-8 w-full min-h-screen">
        <ProgressBar step="SECOND" />
        <div className="flex gap-4 mt-8 mb-3">
          <PersonnelUploadInput
            personnel={writers}
            setPersonnel={setWriters}
            label="Writers"
          />
          <PersonnelUploadInput
            personnel={cast}
            setPersonnel={setCast}
            label="Cast"
          />
        </div>
        <ImagesUploadInput images={images} setImages={setImages} />
      </div>
      <div className="flex justify-between max-h-12">
        <button
          className="text-cinebhdarkred underline font-semibold cursor-pointer disabled:cursor-default disabled:text-cinebhdust"
          onClick={() => setFormStep("FIRST")}
        >
          Back
        </button>
        <div className="flex gap-4">
          <Button variant={ButtonType.QUATERNARY} onClick={handleSaveToDrafts}>
            Save to Drafts
          </Button>
          <Button
            variant={ButtonType.PRIMARY}
            onClick={() => setFormStep("THIRD")}
            disabled={writers.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}

interface PersonnelUploadInputProps {
  personnel: Array<Personnel>;
  setPersonnel: (writers: Array<Personnel>) => void;
  label: string;
}

function PersonnelUploadInput({
  personnel,
  setPersonnel,
  label,
}: PersonnelUploadInputProps) {
  const writerList = (
    <div className="min-h-40 grid grid-cols-3 grid-rows-2 gap-x-20 gap-y-10">
      {personnel.map((person: Personnel) => {
        return (
          <div>
            <div className="font-semibold text-cinebhdim text-sm">
              {person.name}
            </div>
            {person.actorRoleName && (
              <div className="text-cinebhlightgray text-xs">
                {person.actorRoleName}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const uploadButton = (
    <div className="w-full flex flex-col justify-center items-center">
      <input
        type="file"
        id="input"
        hidden={true}
        onChange={(e) => handleInput(e.target.files![0])}
        multiple={false}
      />
      <label
        htmlFor="input"
        className="text-cinebhdarkred flex items-center gap-2 cursor-pointer"
      >
        <span>
          <FontAwesomeIcon icon={faPlus} />
        </span>
        <div className="font-semibold underline">{`Upload ${label} via CSV`}</div>
      </label>
    </div>
  );

  function handleInput(file: File) {
    if (file.type !== "text/csv") return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: ParseResult<Personnel>) {
        const personnel: Array<Personnel> = results.data;

        setPersonnel(personnel);
      },
    });
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-between mb-1.5">
        <div className="font-semibold text-cinebhdarkgray">{label}</div>
        <button
          className={classNames("text-cinebherrordark cursor-pointer", {
            hidden: personnel.length === 0,
          })}
          onClick={() => setPersonnel([])}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="border rounded-2xl border-cinebhpale p-4 min-h-44 h-full flex items-center">
        {personnel.length > 0 ? writerList : uploadButton}
      </div>
    </div>
  );
}

interface ImagesUploadInputProps {
  images: Array<ImageModel>;
  setImages: (images: Array<ImageModel>) => void;
}

interface ImageModel {
  image: string;
  isCoverPhoto: boolean;
}

function ImagesUploadInput({ images, setImages }: ImagesUploadInputProps) {

  return (
    <div className="w-full h-full">
      <div className="flex justify-between mb-1.5">
        <div className="font-semibold text-cinebhdarkgray">Upload Photos</div>
      </div>
      <div className="border rounded-2xl border-cinebhpale p-4 min-h-44 h-full flex items-center">
        <ImageCarousel images={images} setImages={setImages} />
      </div>
    </div>
  );
}

function ImageCarousel({ images, setImages }: ImagesUploadInputProps) {
  return (
    <div className="w-full flex justify-between">
      <Image images={images} setImages={setImages} index={0} />
      <Image images={images} setImages={setImages} index={1} />
      <Image images={images} setImages={setImages} index={2} />
      <Image images={images} setImages={setImages} index={3} />
    </div>
  );
}

interface ImageProps {
  images: Array<ImageModel>;
  setImages: (images: Array<ImageModel>) => void;
  index: number;
}

function Image({ images, setImages, index }: ImageProps) {
  const [image, setImage] = useState<string>(defaultImage);

  function handleUpload(file: File) {
    const reader = new FileReader();
    reader.onload = function() {
      setImage(reader.result!.toString());

      const newImages = [...images];
      newImages[index].image = reader.result!.toString();
      setImages(newImages);
    }
    reader.readAsDataURL(file);
  }

  function handleDelete() {
    const newImages = [...images];
    newImages[index].image = defaultImage;
    setImages(newImages);
    setImage(defaultImage);
  }

  function handleRadio() {
    const newImages = [...images];
    newImages.map((image, imageIndex) => {
      image.isCoverPhoto = imageIndex === index;
    });

    setImages(newImages);
  }

  return (
    <div>
      <div className="relative">
        <img
          src={image}
          alt="movie image"
          className="object-center rounded-2xl h-64 w-64"
        />
        <div className="flex flex-col justify-end">
          <div className="h-1/5 bg-cinebhdarkgray opacity-20 flex justify-center items-center w-full absolute z-10 rounded-b-2xl">
            <input
              type="file"
              id={"inputImage" + index}
              hidden={true}
              multiple={false}
              onChange={(e) => {handleUpload(e.target.files![0]); e.target.value = ""}}
            />
            <label
              htmlFor={"inputImage" + index}
              className="text-cinebhneutral underline font-semibold cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex gap-2 items-center">
          <input
            name="radio"
            type="radio"
            className="cursor-pointer accent-cinebhdarkred"
            onChange={handleRadio}
          />
          <label
            htmlFor="radio"
            className="text-cinebhdim font-semibold text-sm"
          >
            Cover Photo
          </label>
        </div>
        <button
          className={classNames(
            {
              "text-cinebherrordark cursor-pointer": image !== defaultImage,
            },
            {
              "text-cinebhdust cursor-default": image === defaultImage,
            },
          )}
          disabled={image === defaultImage}
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
