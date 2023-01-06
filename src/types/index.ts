export type Product = {
  id?: string;
  name: string;
  price: number;
  amount: number;
  address: string;
};
export type Transpoter = {
  id: string;
  transpoter_name: string;
  transpoter_vehicle: string;
  transpoter_vehicle_no: string;
  transpoter_vehicle_image_url: string;
  transpoter_vehicle_image_fileName: string;
  transpoter_vehicle_capacity: number;
  createdAt: string;
  updatedAt: string;
  transpoterId: number;
  transport_fare: number;
};
