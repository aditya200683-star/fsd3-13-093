const Hello=()=>{
  return <h2>welcome to react 19</h2>;
}
const Books=()=>{
  return<>
    <h1 className="text-red-700 text-3xl">Let's React</h1>
    <h2>Price : 699</h2>
    <h3>Rating : 4.7</h3>
     </>
}


export default function App(){
  return (<>
            <h1 className="text-4xl text-center bg-gray-600 text-white my-2 p-2">Hello React</h1>
            <Hello/>
            <Books/>
          </>
      );

};
