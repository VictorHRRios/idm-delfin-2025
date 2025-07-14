const yearInput = document.getElementById('year');
const monthInput = document.getElementById('month');
var map = new L.Map("map", { center: [19.4326, -99.13], zoom: 5 })
	.addLayer(new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

var currentGeoJsonLayer = null;
var municipalitiesData = null;
var newData = null;
var year = 2015;
var month = 1;

$.getJSON("static/states.geojson", function(data) {
	L.geoJson(data, {
		style: {
			color: '#666',
			weight: 1,
			fillOpacity: 0
		}
	}).addTo(map);
});

$.getJSON("/static/municipalities.geojson", function(data) {
	console.log("Municipalities data loaded", data);
	municipalitiesData = data;
	updateMapWithDate(year, month);
}).fail(function() {
	console.error("Failed to load municipalities GeoJSON");
});

$.getJSON("/static/predictions.json", function(data) {
	console.log("new data loaded", data);
	updateData(data)
}).fail(function() {
	console.error("Failed to load update data GeoJSON");
});

yearInput.addEventListener('input', function(event) {
	year = event.target.value;
	console.log("Year changed to:", year);
	updateMapWithDate(year, month);
});

monthInput.addEventListener('input', function(event) {
	month = event.target.value;
	console.log("Month changed to:", month);
	updateMapWithDate(year, month);
});

function updateData(newDataArray) {
	if (!municipalitiesData || !municipalitiesData.features) {
		console.log("Data updated successfully not.");
		console.warn("Municipalities data is not loaded.");
		return;
	}
	console.log("inside")

	newDataArray.forEach(entry => {
		const { Año, Municipio, Mes, total, id_entidad } = entry;

		const feature = municipalitiesData.features.find(f =>
			f.properties.state_code === id_entidad &&
			f.properties.mun_name === Municipio
		);

		if (!feature) {
			console.warn(`No match found for: ${id_entidad} - ${Municipio}`);
			return;
		}

		if (!feature.properties.violence) {
			feature.properties.violence = {};
		}

		if (!feature.properties.violence[Año]) {
			feature.properties.violence[Año] = {};
		}

		feature.properties.violence[Año][Mes] = total;
	});

	console.log("Data updated successfully.");
	updateMapWithDate(year, month);
}

function updateMapWithDate(selectedYear, selectedMonth) {
	if (!municipalitiesData) {
		console.warn("Data not loaded yet");
		return;
	}

	if (currentGeoJsonLayer) {
		map.removeLayer(currentGeoJsonLayer);
	}

	currentGeoJsonLayer = L.geoJson(municipalitiesData, {
		style: function(feature) {
			const props = feature.properties;
			const value = props.violence?.[selectedYear]?.[selectedMonth] ?? 0;

			const color = getColorForValue(value);

			return {
				color: "#fff",
				weight: 0.2,
				fillColor: color,
				fillOpacity: 0.7
			};
		},
		onEachFeature: function(feature, layer) {
			const props = feature.properties;
			const value = props.violence?.[selectedYear]?.[selectedMonth] ?? "Sin datos";

			layer.bindPopup(

				`<strong>${props.state_name}</strong><br/>
				<strong>${props.mun_name}</strong><br/>
                 Código: ${props.mun_code}<br/>
                 Estado: ${props.state_code}<br/>
                 IDM NM (${selectedYear}-${month}): ${value}`
			);
		}
	}).addTo(map);
}

function getColorForValue(value) {
	if (value === 0) return "#CCCCCC";

	const numericValue = Number(value);
	if (isNaN(numericValue)) return "#CCCCCC";

	const min = 50;
	const max = 800;

	if (numericValue <= min) return "#4CAF50";

	if (numericValue >= max) return "#F44336";

	const ratio = (numericValue - min) / (max - min);

	const r = Math.floor(76 + (244 - 76) * ratio); // Green (76) → Red (244)
	const g = Math.floor(175 + (67 - 175) * ratio); // Green (175) → Red (67)
	const b = Math.floor(80 + (54 - 80) * ratio);   // Green (80) → Red (54)

	return `rgb(${r}, ${g}, ${b})`;
}
