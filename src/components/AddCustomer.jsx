// import React from 'react';
// import '../App.css';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useHistory,
//     useLocation,
//     useParams
//   } from "react-router-dom";
//   import CustomersList from './CustomersList.jsx';

// const AddCustomer = () => {

//     let location = useLocation();
//     let background =  location.state && location.state.background;
    
//         return (
//             <div>
//                 <Switch location={background || location}>
//                     <Route path="/" children={<CustomersList />} />
//                 </Switch>
//             {background && <Route path="add" children={<Modal />} />}
//             </div>

//         )
// }

// function Home() {
//     let location = useLocation();
  
//     return (
//         <div>
//           <Link
//             to={{
//               pathname: "/add",
//               // This is the trick! This link sets
//               // the `background` in location state.
//               state: { background: location }
//             }}
//           >
//               Open Modal
//           </Link>
//       </div>
//     );
//   }

// function Modal() {
//     let history = useHistory();
//     let { id } = useParams();
  
  
//     let back = e => {
//       e.stopPropagation();
//       history.goBack();
//     };
  
//     return (
//       <div
//         onClick={back}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           background: "rgba(0, 0, 0, 0.15)"
//         }}
//       >
//         <div
//           className="modal"
//           style={{
//             position: "absolute",
//             background: "#fff",
//             top: 25,
//             left: "10%",
//             right: "10%",
//             padding: 15,
//             border: "2px solid #444"
//           }}
//         >
//           {/* <h1>{image.title}</h1> */}
//           {/* <Image color={image.color} /> */}
//           <button type="button" onClick={back}>
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

// export default AddCustomer;