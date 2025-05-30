const CarouselCard = ({movie}) => {
    return (
        <article className="carousel-card min-height[200px] bg-gray-600">
            <p>{movie.id}</p>
        </article>
    )
}
export default CarouselCard
