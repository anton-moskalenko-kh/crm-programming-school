import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get('api/orders').then(({data}) => setOrders(data))
  }, []);
    return (
        <div>
          <h1>Hello</h1>
          {orders.map((order) => <div key={order.id}>{JSON.stringify(order.surname)}</div>)}
        </div>
    );
};

export default App;