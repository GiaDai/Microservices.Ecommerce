import { Route } from 'react-router-dom';
import { CanAccess } from '@refinedev/core';
import { CreateProduct, EditProduct, ListProduct, ShowProduct } from '@pages/products';

export const ProductRoute = () => (
  <Route path="/products">
    <Route index element={
      <CanAccess
        resource="products"
        action="list"
        fallback={<div>Unauthorized!</div>}
      >
        <ListProduct />
      </CanAccess>
    } />
    <Route path="create" element={<CreateProduct />} />
    <Route path=":id" element={<ShowProduct />} />
    <Route path=":id/edit" element={<EditProduct />} />
  </Route>
);