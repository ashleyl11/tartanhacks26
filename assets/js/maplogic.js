// 1. YOUR SETTINGS
const OPEN_STATES_API_KEY = 'a966b62f-c200-468a-a737-c7e5da4dfbbd';

// Mapping helper for the API
const stateNameToCode = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD", "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY"
};

// 2. INITIALIZE MAP
const map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO'
}).addTo(map);

let geojson;

// 3. THE API FETCH FUNCTION
async function updateLegislation(stateName) {
    const listContainer = document.getElementById('legislation-list');
    const stateCode = stateNameToCode[stateName];

    if (!stateCode) {
        listContainer.innerHTML = "<p>State code not found.</p>";
        return;
    }

    listContainer.innerHTML = `<div class="loader">🔍 Fetching latest bills for ${stateName}...</div>`;

    try {
        // Fetching 5 most recent bills from Open States
        const url = `https://v3.openstates.org/bills?jurisdiction=${stateCode}&sort=updated_desc&per_page=5`;
        const response = await fetch(url, {
            headers: { 'X-API-KEY': OPEN_STATES_API_KEY }
        });
        const data = await response.json();

        listContainer.innerHTML = ""; // Clear loader

        data.results.forEach(bill => {
            const mailto = `mailto:rep@state.gov?subject=Regarding ${bill.identifier}&body=I am a constituent writing about ${bill.title}...`;
            
            listContainer.innerHTML += `
                <div class="legislation-card">
                    <h4>${bill.identifier}</h4>
                    <p style="font-size: 0.85rem; margin-bottom: 10px;">${bill.title}</p>
                    <ul class="actions">
                        <li><a href="${mailto}" class="button primary small">Email My Rep</a></li>
                    </ul>
                </div>
            `;
        });
    } catch (err) {
        listContainer.innerHTML = "<p>Error loading bills. Check console for details.</p>";
        console.error(err);
    }
}

// 4. MAP INTERACTION LOGIC
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: (e) => {
            e.target.setStyle({ fillOpacity: 0.8, weight: 2, color: '#ffffff' });
        },
        mouseout: (e) => {
            geojson.resetStyle(e.target);
        },
        click: (e) => {
            const name = feature.properties.name;
            document.getElementById('district-title').innerText = name;
            updateLegislation(name);
            map.fitBounds(e.target.getBounds());
        }
    });
}

// 5. LOAD THE MAP SHAPES
fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')
    .then(res => res.json())
    .then(data => {
        geojson = L.geoJSON(data, {
            style: {
                fillColor: "#2e3450",
                weight: 1,
                color: 'rgba(255,255,255,0.3)',
                fillOpacity: 0.5
            },
            onEachFeature: onEachFeature
        }).addTo(map);
    });