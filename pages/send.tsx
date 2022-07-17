import { collection, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Send() {
    const giftsRef = collection(getFirestore(), 'wishes')

    const giftsQuery = query(giftsRef, where("approved", "==", true))

    const [querySnapshot] = useCollection(giftsQuery)

    const gifts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        // grid lg:grid-cols-2 grid-cols-1
        <div className="grid place-items-center h-auto pt-16">
            {gifts ? (<GiftSelector gifts={gifts} />) : (<></>)}
        </div>
    )
}

function GiftSelector(props) {
    const [selectedGifts, setSelectedGifts] = useState([])
    const [showGift, setShowGift] = useState(0)

    let giftsArray = props.gifts.map((element, index) => {
        return (
            // <div className={!selectedGifts.includes(index) ? "select-none shadow rounded-lg p-4 h-min w-fit" : "select-none shadow-xl rounded-lg p-4 h-min w-fit"} key={index}>
            //     <img src={element.letter} alt="" />
            // </div>
            <div className="grid grid-cols-1 sm:grid-cols-2" key={index}>
                <div>
                    <img src={element.letter} alt="" />
                </div>
                <div>
                    <img src={element.image} alt="" />
                </div>
            </div>
        )
    })

    console.log(props.gifts, showGift)

    const removeSelectedGift = (e) => {
        let name = e
        setSelectedGifts(selectedGifts.filter((e) => (e !== name)))
    };

    useEffect(() => {
        console.log(selectedGifts)
    }, [selectedGifts])

    return (
        <div className="p-[10vh] w-full">
            <div className="flex justify-center font-['Kuku']">
                <button onClick={() => {
                    if (showGift - 1 >= 0) {
                        setShowGift(showGift - 1)
                    } else {
                        setShowGift(giftsArray.length - 1)
                    }
                }}>{"<"}</button>
                <div className="w-[40%] flex justify-center font-['Roboto']">
                    {props.gifts[showGift].name}
                    {`, ${new Date().getFullYear() - new Date((Date.parse(props.gifts[showGift].age))).getFullYear()}`}
                </div>
                {/* <div className="w-[30%] flex justify-center">
                    <button onClick={() => {
                        if (!selectedGifts.includes(showGift)) {
                            setSelectedGifts(oldArray => [...oldArray, showGift])
                        } else {
                            removeSelectedGift(showGift)
                        }
                    }}>{!selectedGifts.includes(showGift) ? ("Выбрать") : ("Выбранно")}</button>
                </div> */}
                <button onClick={() => {
                    if (showGift + 1 <= giftsArray.length - 1) {
                        setShowGift(showGift + 1)
                    } else {
                        setShowGift(0)
                    }
                }}>{">"}</button>
            </div>
            <div className="grid">
                {giftsArray[showGift]}
            </div>
            <h1>
                Buy
            </h1>
        </div>
    )

}