const board = document.getElementById('transporte-board');
const legend = document.getElementById('legend');
const gridWidth = 9; // columns
const gridHeight = 7; // rows

if (board) {
    // Create the board with roads and cells
    for (let i = 0; i < gridWidth * gridHeight; i++) {
        const cell = document.createElement('div');
        const row = Math.floor(i / gridWidth); // Current row
        const col = i % gridWidth;            // Current column

        if (row === 3 && (col === 1 || col === 3 || col === 5 || col === 7)) {
            // Intersection of horizontal and vertical roads
            cell.classList.add('cell', 'intersection-road');
        } else if (row === 3) {
            // Horizontal road
            cell.classList.add('cell', 'horizontal-road');
        } else if (col === 1 || col === 3 || col === 5 || col === 7) {
            // Vertical roads
            cell.classList.add('cell', 'vertical-road');
        } else {
            // Normal cell
            cell.classList.add('cell');
        }

        // Apply bus stop style to specific cells
        if ((row === 0 && col === 1) || (row === 6 && col === 7)) {
            cell.classList.add('bus-stop');
            cell.textContent = 'BUS'; // Add text to the bus stop
        }

        board.appendChild(cell);
    }

    const rutas = [
        {
            id: 1,
            color: '#7b4c34',
            name: 'Linea 1',
            path: [
                { x: 1, y: 0 },
                { x: 1, y: 1 },
                { x: 1, y: 2 },
                { x: 1, y: 3 },
                { x: 2, y: 3 },
                { x: 3, y: 3 },
                { x: 4, y: 3 },
                { x: 5, y: 3 },
                { x: 5, y: 4 },
                { x: 5, y: 5 },
                { x: 5, y: 6 },
            ],
        },
        {
            id: 2,
            color: '#317f43',
            name: 'Linea 2',
            path: [
                { x: 7, y: 6 },
                { x: 7, y: 5 },
                { x: 7, y: 4 },
                { x: 7, y: 3 },
                { x: 6, y: 3 },
                { x: 5, y: 3 },
                { x: 4, y: 3 },
                { x: 3, y: 3 },
                { x: 3, y: 2 },
                { x: 3, y: 1 },
                { x: 3, y: 0 },
            ],
        }
    ];

    rutas.forEach(ruta => {
        // Add legend item
        const legendItem = document.createElement('div');
        legendItem.classList.add('legend-item');

        const legendColor = document.createElement('div');
        legendColor.classList.add('legend-color');
        legendColor.style.backgroundColor = ruta.color;

        const legendText = document.createElement('span');
        legendText.textContent = ruta.name;

        legendItem.appendChild(legendColor);
        legendItem.appendChild(legendText);
        legend.appendChild(legendItem);

        // Draw route lines
        ruta.path.forEach((point, index) => {
            const cellIndex = point.y * gridWidth + point.x;
            const cell = board.children[cellIndex];

            if (cell) {
                const routeLine = document.createElement('div');
                routeLine.classList.add('route', `route${ruta.id}`);
                routeLine.style.backgroundColor = ruta.color;

                // Determine orientation of the line (horizontal or vertical)
                if (index > 0) {
                    const prevPoint = ruta.path[index - 1];
                    if (prevPoint.x === point.x) {
                        routeLine.classList.add('vertical');
                    } else if (prevPoint.y === point.y) {
                        routeLine.classList.add('horizontal');
                    }
                }

                cell.appendChild(routeLine);
            }
        });
    });

    // Fetch and render static buildings
    fetch('http://localhost:8080/mapa/edificios')
        .then(response => response.json())
        .then(buildings => {
            const waterConsumptionData = [];
            const buildingLabels = [];
            buildings.forEach(building => {
                if (building.x >= 0 && building.x < gridWidth && building.y >= 0 && building.y < gridHeight) {
                    const index = building.y * gridWidth + building.x;
                    const cell = board.children[index];

                    const buildingDiv = document.createElement('div');
                    buildingDiv.classList.add('building');
                    buildingDiv.style.width = `${building.width}px`;
                    buildingDiv.style.height = `${building.height}px`;
                    buildingDiv.style.backgroundColor = building.color; // Assign building color

                    cell.appendChild(buildingDiv);

                    // Simulate water consumption
                    const consumption = Math.floor(Math.random() * 100) + 1;
                    waterConsumptionData.push(consumption);
                    buildingLabels.push(`Building (${building.x},${building.y})`);
                }
            });
        })
        .catch(error => console.error('Error fetching buildings:', error));
}

function fetchAndUpdateBuses() {
    // Clear dynamic bus elements
    document.querySelectorAll('.bus').forEach(element => element.remove());

    fetch('/transporte/buses')
        .then(response => response.json())
        .then(buses => {
            if (Array.isArray(buses)) {
                buses.forEach(bus => {
                    if (bus.x >= 0 && bus.x < gridWidth && bus.y >= 0 && bus.y < gridHeight) {
                        const index = bus.y * gridWidth + bus.x;
                        const cell = board.children[index];

                        const busDiv = document.createElement('div');
                        busDiv.classList.add('bus');
                        busDiv.style.backgroundColor = 'blue'; // Assign bus color
                        cell.appendChild(busDiv);
                    }
                });
            } else {
                console.error('Invalid buses response:', buses);
            }
        })
        .catch(error => console.error('Error fetching buses:', error));
}

// Update buses dynamically every 2 seconds
setInterval(fetchAndUpdateBuses, 2000);

fetch('/mapa/residuos')
    .then(response => response.json())
    .then(recyclingPoints => {
        if (Array.isArray(recyclingPoints)) {
            recyclingPoints.forEach(point => {
                if (point.x >= 0 && point.x < gridWidth && point.y >= 0 && point.y < gridHeight) {
                    const index = point.y * gridWidth + point.x;
                    const cell = board.children[index];

                    const container1 = document.createElement('div');
                    container1.classList.add('recycling-container');
                    container1.style.width = `${point.width / 3}px`;
                    container1.style.height = `${point.height / 3}px`;
                    container1.style.backgroundColor = point.color1;

                    const container2 = document.createElement('div');
                    container2.classList.add('recycling-container');
                    container2.style.width = `${point.width / 3}px`;
                    container2.style.height = `${point.height / 3}px`;
                    container2.style.backgroundColor = point.color2;

                    const container3 = document.createElement('div');
                    container3.classList.add('recycling-container');
                    container3.style.width = `${point.width / 3}px`;
                    container3.style.height = `${point.height / 3}px`;
                    container3.style.backgroundColor = point.color3;

                    cell.appendChild(container1);
                    cell.appendChild(container2);
                    cell.appendChild(container3);
                }
            });
        } else {
            console.error('Invalid recycling points response:', recyclingPoints);
        }
    })
    .catch(error => console.error('Error fetching recycling points:', error));