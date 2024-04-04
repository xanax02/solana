import MovieReviewForm from "@/components/movieReviewForm/MovieReviewForm";
import MovieReviews from "@/components/movieReviews/MovieReviews";

export default function Home() {
  return (
    <section className="flex justify-center pt-4 w-[50%] mx-auto">
      <div className="">
        <MovieReviewForm />
        <MovieReviews />
      </div>
    </section>
  );
}
