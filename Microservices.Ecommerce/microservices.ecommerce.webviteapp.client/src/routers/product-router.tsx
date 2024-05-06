// ProductComponent.tsx
import { Route } from "react-router-dom";
import { CanAccess } from "@refinedev/core";
import {
  ListProduct,
  CreateProduct,
  ShowProduct,
  EditProduct,
  CreateProductRange,
} from "@pages/products"; // replace with your actual import path
import { Unauthorized } from "@components/index";

export const ProductRoutes = () => {
  return (
    <>
      <Route
        index
        element={
          <CanAccess
            resource="products"
            action="list"
            fallback={<Unauthorized />}
          >
            <ListProduct />
          </CanAccess>
        }
      />
      <Route
        path="create"
        element={
          <CanAccess
            resource="products"
            action="create"
            fallback={<Unauthorized />}
          >
            <CreateProduct />
          </CanAccess>
        }
      />
      <Route
        path=":id"
        element={
          <CanAccess
            resource="products"
            action="show"
            fallback={<Unauthorized />}
          >
            <ShowProduct />
          </CanAccess>
        }
      />
      <Route
        path=":id/edit"
        element={
          <CanAccess
            resource="products"
            action="show"
            fallback={<Unauthorized />}
          >
            <EditProduct />
          </CanAccess>
        }
      />
      <Route
        path="create-range"
        element={
          <CanAccess
            resource="products"
            action="create-range"
            fallback={<Unauthorized />}
          >
            <CreateProductRange />
          </CanAccess>
        }
      />
    </>
  );
};
