//CHIRPS: Daily

//Koleksi Dataset
var chirps_day = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')

//Filter Tanggal Dataset
.filterDate('2025-11-01', '2025-12-31');

//Print Dataset
print(chirps_day);

//Memilih Band Dataset
var chirps_day_pcp = chirps_day.select('precipitation');

// Stasiun BMKG
var station = ee.Geometry.Point([110.3812, -6.9847]);

//Menampilkan Stasiun BMKG
Map.addLayer(station, {color : 'red'}, 'Stasiun BMKG');

// Chart time series (mm/day)
var chirps_day_pcp_ts = ui.Chart.image.series({
  imageCollection: chirps_day_pcp,
  region: station,
  reducer: ee.Reducer.mean(),
  scale: 5566,
  xProperty: 'system:time_start'})
  .setOptions({
     title: 'Station NN - Precipitation 2019, January',
     vAxis: {title: 'mm/day'}});
print(chirps_day_pcp_ts);

//Nilai Total CHIRPS (mm/month)
var chirps_day_pcp_sum = chirps_day_pcp.sum()

// Clip Dataset
.clip(geometry);

//Parameter Visualisasi
var chirps_day_pcp_param = {
	min: 0.00, 
	max: 500.00, 
	palette: ['red', 'darkorange', 'yellow', 'limegreen', 'darkgreen']
};

//Menampilkan Dataset CHIRPS pada Layer Peta
Map.addLayer (chirps_day_pcp_sum, chirps_day_pcp_param, 'CHIRPS_MO_PCP');

//Eksport Data
Export.image.toDrive({
  image: chirps_day_pcp_sum,
  description: 'CHIRPS_MO_201901',
  scale: 5566,
  region: geometry,
  fileFormat: 'GeoTIFF'
  });
  
  
//Nilai Total CHIRPS (mm/month atau Akumulasi Total selama periode)
var chirps_day_pcp_sum = chirps_day_pcp.sum().clip(geometry);

// ============================================================
// TAMBAHAN: RATA-RATA (MEAN)
// ============================================================

// 1. Menghitung Rata-rata Curah Hujan Harian (mm/day)
var chirps_day_pcp_mean = chirps_day_pcp.mean().clip(geometry);

// 2. Parameter Visualisasi untuk Rata-rata
// (Max dibuat lebih kecil karena nilai rata-rata pasti lebih rendah dari total)
var chirps_mean_param = {
    min: 0.00, 
    max: 20.00,  // Sesuaikan max ini tergantung curah hujan (misal 20-30 mm/hari)
    palette: ['white', 'cyan', 'blue', 'darkblue', 'purple']
};

// 3. Menampilkan Layer Rata-rata di Peta
Map.addLayer(chirps_day_pcp_mean, chirps_mean_param, 'CHIRPS_Mean_PCP (Rata-rata Harian)');

// 4. Export Data Rata-rata (Mean)
Export.image.toDrive({
  image: chirps_day_pcp_mean,
  description: 'CHIRPS_Mean_2025_NovDec',
  scale: 5566,
  region: geometry,
  fileFormat: 'GeoTIFF'
});

// ... (Lanjutkan dengan kode Map.addLayer SUM dan Export SUM yang sudah ada) ...
