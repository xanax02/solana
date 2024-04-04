export default function() {
    return (
        <div className="">
            <p>Add a review</p>
            <form className="flex flex-col border-2 border-white p-4 rounded-md">
                <label className="mb-1" htmlFor="title_input">Movie Title</label>
                <input className="rounded-md focus:outline-none py-1 bg-transparent border-[1px] border-white px-2" id="title_input" type="text"/>
                
                <label className="mt-4 mb-1" htmlFor="review_input">Add your review</label> 
                <textarea className="rounded-md focus:outline-none py-1 bg-transparent border-[1px] border-white px-2" id="review_input" rows={4} />
                
                <label className="mt-4 mb-1" htmlFor="rating_input">Rating</label>
                <input className="rounded-md focus:outline-none pl-2 bg-transparent border-[1px] border-white" type="number" max={5} min={0} />

                <button className="w-full bg-white text-gray-800 rounded-md mt-4 py-1">Submit Review</button>
            </form>
        </div>
    )
}