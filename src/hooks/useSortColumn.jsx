//! hookları neden kullanıyoruz
//* icinde jsx döndürmüyoruz.jsx döndürdüğümüz zaman renderla ilgili sorunlar yasanabiliyor

import { useEffect, useState } from "react";

const useSortColumn = (data, columnObj) => {
  //? Siralanacak local state (sutun verilerinin local state hali)
  const [sortedData, setSortedData] = useState(data);
  const [columns, setColumns] = useState(columnObj);

  //! data state'i her guncellendiginde local state'i de guncelle
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  //? Jenerik Sutun siralama fonksiyonu
  const handleSort = (arg, type) => {
    setColumns({ ...columns, [arg]: columns[arg] * -1 });
    // state obje biciminde old.icin icindeki bir veriyi degistirmek icin önce objeyi acmamiz gerekiyor.
    // toggle.arg yazsaydık arg bir değişken oldugu icin hata verirdi obje icinde arg diye bir key arardı.
    // arg bir değişken old.icin toggle[arg] seklinde yazıyoruz
    setSortedData(
      sortedData
        ?.map((item) => item)
        .sort((a, b) => {
          if (type === "date") {
            return columns[arg] * (new Date(a[arg]) - new Date(b[arg]));
          } else if (type === "number") {
            return columns[arg] * (a[arg] - b[arg]);
          } else {
            if (columns[arg] === 1) {
              return b[arg] > a[arg] ? 1 : b[arg] < a[arg] ? -1 : 0;
            } else {
              return a[arg] > b[arg] ? 1 : a[arg] < b[arg] ? -1 : 0;
            }
          }
        })
    );
  };

  return { sortedData, handleSort, columns };
};

export default useSortColumn;
