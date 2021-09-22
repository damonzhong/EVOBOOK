// Testing create user functionality
import Axios from "axios";

const Test = () => {
  var response;
  Axios.get("/getAllItems")
    .then((res) => {
      console.log(res.data);
      // Do Something to present the response (res)
    })
    .catch(() => {
      //setError('Failed to Retrieve Item List')
    });
};

export default Test;
