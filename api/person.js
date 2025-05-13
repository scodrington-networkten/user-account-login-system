export default function person(request, response){
    return response.status(200).json({
        name: "John Smith",
        age: 22
    })
}
