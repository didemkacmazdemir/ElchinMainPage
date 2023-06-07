document.getElementById('carbonFootprintTab').onclick = function() {
    let mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <h2>Your Current Carbon Footprint: <span id="currentFootprint"></span></h2>
        <h2>Calculate Your Carbon Footprint</h2>
        <input id="inputField" type="number" placeholder="Enter emission value">
        <button onclick="calculateFootprint()">Calculate</button>
        <h2>Your Footprint History:</h2>
        <div id="history"></div>
        <h2>Tips for Reducing Your Carbon Footprint</h2>
        <p>Walk or cycle when you can, eat less meat, recycle...</p>
    `;
    calculateFootprint();
}

let footprint = 1000;
let history = [1000, 1050, 1100, 1050, 1000, 950];

function calculateFootprint() {
    let input = document.getElementById('inputField').value;
    footprint += Number(input);
    history.push(footprint);
    document.getElementById('currentFootprint').innerText = footprint;
    drawHistory();
}

function drawHistory() {
    let historyDiv = documentSorry for the cut-off in the previous message. Here's the continuation of the `script.js`:

```javascript
.getElementById('history');
    historyDiv.innerHTML = '';
    for(let i = 0; i < history.length; i++) {
        let div = document.createElement('div');
        div.style.height = history[i] / 10 + 'px';
        div.style.width = '20px';
        div.style.background = '#32CD32';
        div.style.margin = '5px';
        historyDiv.appendChild(div);
    }
}
