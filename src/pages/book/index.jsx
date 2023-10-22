import { useLocation } from "react-router-dom";

const BookPage = () => {
    const location = useLocation()
    console.log('locationCheck', location)

    let param = new URLSearchParams(location.search);
    console.log('checkParams',param)
    const id = param?.get("id")
    console.log('checkID',id)
    return (
        <>
            book page
        </>
    )
}

export default BookPage;