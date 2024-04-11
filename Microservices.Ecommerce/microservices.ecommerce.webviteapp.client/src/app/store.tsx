import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '@features/common/headerSlice'
import modalSlice from '@features/common/modalSlice'
import rightDrawerSlice from '@features/common/rightDrawerSlice'
import leadsSlice from '@features/leads/leadSlice'
import toastSlice from '@features/common/toastSlice'

const combinedReducer = {
  header : headerSlice,
  rightDrawer : rightDrawerSlice,
  modal : modalSlice,
  lead : leadsSlice,
  toast : toastSlice
}

export default configureStore({
    reducer: combinedReducer
})