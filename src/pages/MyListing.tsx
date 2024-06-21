import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";


export default function MyListing() {

    const getMyLisings  = () =>{

    }

    return (
        <>
            <main className='px-4'>
                <PageHeading title='My Listings'></PageHeading>
                <ListingsGrid>
                    {"My Listings"}
                </ListingsGrid>
            </main>
        </>
    )
}