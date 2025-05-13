export default function test(request, response) {


    //console.log('METHOD:', request.method);
    //console.log('QUERY:', request.query.test);
   // console.log("WOO");

    let message = request.query.message != undefined ? request.query.message : '';

    console.log(`The Message is: ${message}`);

    response.status(200).json({ message: 'Hello from test function!' });
}
