import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/allCalls";
import { Product, Transpoter } from "../types";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useStateContext } from "../context/ContextProvider";
import { calculateFare, calculateProfit } from "../utils";
import { PaynowPayment } from "paynow-react";

const center = { lat: -34.059366528995305, lng: 18.526149416481054 };
interface Item {
  amount: number;
  title: string;
  quantity: number;
}

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [transpoters, setTranspoters] = useState<Transpoter[]>([]);
  const { currentColor, addProduct, getAllTranspoters } = useStateContext();
  const [fare, setFare] = useState(0);
  const [amount, setAmount] = useState(0);
  const [jorneyFare, setJorneyFare] = useState(0);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBuTLnTvdUHJwR0SZZmJ9wI7fkuaSay1Ig",
    libraries: ["places"],
  });

  //@ts-ignore
  const [map, setMap] = useState(/** @type google.maps.Map */ null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [profit, setProfit] = useState(0);
  const [price, setPrice] = useState(0);
  const [transpoter, setTransporter] = useState<Transpoter>();

  const originRef = useRef<HTMLInputElement>();

  const destiantionRef = useRef<HTMLInputElement>();

  useEffect(() => {
    const getProduct = async () => {
      setProduct(await getSingleProduct(id));
      setTranspoters(await getAllTranspoters());
    };
    getProduct();
  }, []);

  async function calculateRoute() {
    if (
      originRef?.current?.value === "" ||
      destiantionRef?.current?.value === ""
    ) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef?.current?.value!,
      destination: destiantionRef?.current?.value!,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    //@ts-ignore
    setDirectionsResponse(results);
    //@ts-ignore
    setDistance(results.routes[0].legs[0].distance.text);
    //@ts-ignore
    setDuration(results.routes[0].legs[0].duration.text);
    setProfit(calculateProfit(parseInt(distance), fare, amount, price));
    setJorneyFare(calculateFare(parseInt(distance), fare));
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setAmount(0);
    setFare(0);
    setTransporter(undefined);
    //@ts-ignore
    originRef.current.value = "";
    //@ts-ignore
    destiantionRef.current.value = "";
  }

  if (!isLoaded) {
    return <>loading</>;
  }

  const handleChange = (e: React.ChangeEventHandler<HTMLSelectElement>) => {
    //@ts-ignore
    const transpoter: Transpoter = JSON.parse(e.target.value);
    setFare(transpoter.transport_fare);
    setTransporter(transpoter);
  };

  const items = [
    {
      title: "Annual Bleek Subscription",
      amount: 10,
      quantity: 1,
      image:
        "https://d1wqzb5bdbcre6.cloudfront.net/c25a949b6f1ffabee9af1a5696d7f152325bdce2d1b926456d42994c3d91ad78/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f666c5f746573745f67625631776635726a4c64725a635858647032346d643649",
    },
  ];
  const onCloseHandler = (data: any) => {
    // Do something with the data and the close the modal
    console.log(data);
    setIsOpen(false);
  };
  const onCheckoutClick = () => {};

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "500px", height: "500px" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            //@ts-ignore
            onLoad={(map) => setMap(map)}
          >
            {/* <Marker position={center} /> */}
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div className="grid gap-6 w-full md:grid-cols-2   pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex ml-6 items-center">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  value={product?.name}
                />
              </div>
              <div className="flex ml-6 items-center">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  //@ts-ignore
                  onChange={handleChange}
                >
                  <option selected>Choose Transport</option>
                  {transpoters?.map((transpoter) => (
                    <option
                      value={JSON.stringify(transpoter)}
                      key={transpoter.id}
                    >
                      {transpoter.transpoter_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex ml-6 items-center">
                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Amount"
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="grid gap-6 w-full md:grid-cols-2 mt-6  pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex ml-6 items-center">
                <Autocomplete>
                  <input
                    type="text"
                    placeholder="Origin"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    //@ts-ignore
                    ref={originRef}
                  />
                </Autocomplete>
              </div>
              <div className="flex ml-6 items-center">
                <Autocomplete>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Destination"
                    //@ts-ignore
                    ref={destiantionRef}
                    value={product?.address || ""}
                  />
                </Autocomplete>
              </div>
              <div className="flex ml-6 items-center">
                <h1>Name: {transpoter?.transpoter_name}</h1>
              </div>
              <div className="flex ml-6 items-center">
                <h1>Vehicle Name {transpoter?.transpoter_vehicle}</h1>
              </div>
              <div className="flex ml-6 items-center">
                <h1>
                  Capacity: {transpoter?.transpoter_vehicle_capacity || 0} kgs
                </h1>
              </div>
              <div className="flex ml-6 items-center">
                <h1>Capacity: {transpoter?.transpoter_vehicle_no || 0}</h1>
              </div>
            </div>

            <div className="grid gap-6 w-full md:grid-cols-2 mt-6  pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex ml-6 items-center">
                Distance:{distance || 0}
              </div>
              <div className="flex ml-6 items-center">
                Duration:{duration || 0}
              </div>
              <div className="flex ml-6 items-center">Fare/km:{fare}</div>
              <div className="flex ml-6 items-center">
                Total Fare:{calculateFare(parseInt(distance), fare) || 0}
              </div>
              <div className="flex ml-6 items-center">Profit:{}</div>
            </div>
            <div className="grid gap-6 w-full md:grid-cols-2 mt-6  pb-5 border-b-2 border-gray-200 mb-5">
              <button
                onClick={calculateRoute}
                style={{ backgroundColor: currentColor }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {" "}
                Calculate Route
              </button>
              <button
                onClick={clearRoute}
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Clear Route
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Check Out
              </button>

              <div>
                <PaynowPayment
                  //@ts-ignore
                  items={items}
                  label="Express checkout"
                  paymentMode="mobile"
                  isOpen={isOpen}
                  onClose={onCloseHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
