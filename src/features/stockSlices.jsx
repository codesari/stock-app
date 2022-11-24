import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",

  //todo: uygulamada globalState olmasini istediğimiz state'leri buraya yaziyoruz (her tarafta bize lazım olacagini düsündügümüz)
  initialState: {
    loading: false,
    error: false,
    purchases: null,
    sales: null,
    products: null,
    brands: null,
    firms: null,
    categories: null,
  },
  //todo: reducer'lar de stateleri degistirir
  //? yukaridaki tüm stateler'in bir get istegi olacak.öyleyse 3 durum var.fetch istegi,basarili veya basarisiz olma durumu
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSuccess: (state, { payload: { data, url } }) => {
      //? istek basarili oldugu icin loading false oldu
      state.loading = false;
      //! ancak square bracket yöntemi ile state e degisken atayabiliyoruz
      state[url] = data;
      //! her bir state icin getSuccess yazmaktansa url de hangi state geldiyse onun successi calisiyor
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, getSuccess, fetchFail } = stockSlice.actions;
export default stockSlice.reducer;
