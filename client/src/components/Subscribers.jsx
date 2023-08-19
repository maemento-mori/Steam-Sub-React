import React from "react";

const Subscribers = () => {
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     fetch("/testFetch")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.message)
  //       console.log(data.message)
  //     });
  //   },30000)
  // }, []);


  
  return (
    <div>
      <h1>Hello world!</h1>
      <p>I am in a React Component!</p>
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
};
export default Subscribers;