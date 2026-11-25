
const Hello = () => {
  return <h2>Welcome to React 19</h2>;
};

function You(props) {
  return (
    <div className="bg-blue-100 p-5 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-blue-900">My Details</h2>
      <h1 className="text-lg font-semibold">{props.name}</h1>
      <h2 className="text-gray-700">{props.email}</h2>
      <h2 className="text-gray-700">Age: {props.age}</h2>
    </div>
  );
}

function Frnd(props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:bg-blue-50 hover:scale-105 transition">
      <h2 className="text-xl font-bold text-blue-800">
        {props.name}
      </h2>
      <p className="text-gray-600">{props.email}</p>
      <p className="text-gray-700 font-medium">
        Age: {props.age}
      </p>
    </div>
  );
}

export default function App() {

  const myself = {
    name: "Aditya Patel",
    email: "aditya2006@gmail.com",
    age: 21
  };

  const friends = [
    { name: "Ram", email: "ram@gmail.com", age: 19 },
    { name: "Riya", email: "riya@gmail.com", age: 24 },
    { name: "Aman", email: "aman@gmail.com", age: 20 },
    { name: "Rahul", email: "rahul@gmail.com", age: 21 },
    { name: "Priya", email: "priya@gmail.com", age: 22 },
    { name: "Karan", email: "karan@gmail.com", age: 23 },
    { name: "Neha", email: "neha@gmail.com", age: 20 },
    { name: "Ankit", email: "ankit@gmail.com", age: 19 },
    { name: "Simran", email: "simran@gmail.com", age: 22 },
    { name: "Arjun", email: "arjun@gmail.com", age: 21 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-900 text-center mb-6">
        Let's React 🚀
      </h1>

      <div className="text-center mb-8">
        <Hello />
      </div>

      {/* My Details */}
      <div className="max-w-md mx-auto mb-10">
        <You {...myself} />
      </div>

      {/* Friends */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        My Friends 👥
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {friends.map((friend, index) => (
          <Frnd
            key={index}
            name={friend.name}
            email={friend.email}
            age={friend.age}
          />
        ))}

      </div>

    </div>
  );
}
