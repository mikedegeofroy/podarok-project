import { collection, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Send() {
    const giftsRef = collection(getFirestore(), 'wishes')

    const giftsQuery = query(giftsRef, where("approved", "==", true))

    const [querySnapshot] = useCollection(giftsQuery)

    const gifts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 h-auto pt-16">
            {gifts ? (<GiftSelector gifts={gifts} />) : (<></>)}
        </div>
    )
}

function GiftSelector(props) {
    const giftsArray = props.gifts

    const [selectedGifts, setSelectedGifts] = useState([])

    const removeSelectedGift = (e) => {
        let name = e
        setSelectedGifts(selectedGifts.filter((e) => (e !== name)))
    };

    useEffect(() => {
        console.log(selectedGifts)
    }, [selectedGifts])

    return (
        <>
            <div className="m-10">
                <h1>Select a wish</h1>
                {selectedGifts.map((x, index) => {

                    const gift = giftsArray[x]

                    console.log(gift)

                    return (
                        <div key={index}>
                            <h1>{gift.name}</h1>
                            <h1>{gift.age}</h1>
                            <img src={gift.image} alt="" />
                        </div>
                    )
                })}
            </div>
            <div className="grid gap-4 grid-cols-2 mb-6 m-10">
                {giftsArray.map((element, index) => {
                    return (
                        <div onClick={() => {
                            // && selectedGifts.length <= 2
                            if (!selectedGifts.includes(index)) {
                                setSelectedGifts(oldArray => [...oldArray, index])
                            } else {
                                removeSelectedGift(index)
                            }
                        }} className={!selectedGifts.includes(index) ? "select-none shadow rounded-lg p-4 h-min w-full" : "select-none shadow-xl rounded-lg p-4 h-min w-full"} key={index}>
                            {/* <a className="grid place-items-center text-center h-full w-full" href={element.url} rel="noopener noreferrer" target="_blank"></a> */}
                            <img src={element.letter} alt="" />
                        </div>
                    )
                })}
            </div>
        </>
    )

}