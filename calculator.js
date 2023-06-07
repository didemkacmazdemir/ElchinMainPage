google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initialize);

var data = {
    '1': {'name': 'Customer 1', 'monthlyCarbonFootprint': [4.79, 9.55, 5.15, 5.00, 3.02, 5.63]},
    '2': {'name': 'Customer 2', 'monthlyCarbonFootprint': [9.69, 4.94, 4.59, 1.91, 5.01, 5.27]},
    '3': {'name': 'Customer 3', 'monthlyCarbonFootprint': [5.04, 1.73, 5.14, 9.60, 3.20, 5.49]},
    '4': {'name': 'Customer 4', 'monthlyCarbonFootprint': [1.54, 5.16, 5.46, 9.33, 3.33, 5.02]},
    '5': {'name': 'Customer 5', 'monthlyCarbonFootprint': [5.34, 1.78, 5.18, 9.45, 3.08, 5.36]},
    '6': {'name': 'Customer 6', 'monthlyCarbonFootprint': [5.20, 2.02, 5.29, 9.51, 3.32, 5.58]},
    '7': {'name': 'Customer 7', 'monthlyCarbonFootprint': [5.07, 1.62, 5.10, 9.50, 3.06, 5.31]},
    '8': {'name': 'Customer 8', 'monthlyCarbonFootprint': [5.16, 1.52, 5.14, 9.32, 2.98, 5.26]},
    '9': {'name': 'Customer 9', 'monthlyCarbonFootprint': [5.21, 1.44, 5.17, 9.30, 2.92, 5.20]},
    '10': {'name': 'Customer 10', 'monthlyCarbonFootprint': [5.26, 1.37, 5.20, 9.28, 2.88, 5.15]}
};

var userIds = Object.keys(data);
var selectedUserId = userIds[0];

var userSelect = document.getElementById('user-select');
var resultDiv = document.getElementById('result');
var suggestionsDiv = document.getElementById('suggestions');
var customResultDiv = document.getElementById('custom-result');
var customSuggestionsDiv = document.getElementById('custom-suggestions');
var awardsDiv = document.getElementById('awards');

function initialize() {
    userIds.forEach(function(userId) {
        var option = document.createElement('option');
        option.value = userId;
        option.text = data[userId].name;
        userSelect.appendChild(option);
    });

    displayUserFootprint();
}

function calculate(digital, atm, branch) {
    // Formula: (Digital Transactions * 0.004) + (ATM Transactions * 0.4) + (Branch Visits * 2.2)
    return (digital * 0.004) + (atm * 0.4) + (branch * 2.2);
}

function displayUserFootprint() {
    selectedUserId = userSelect.value;
    var user = data[selectedUserId];
    var footprint = user.monthlyCarbonFootprint[user.monthlyCarbonFootprint.length - 1];
    resultDiv.innerText = 'Carbon Footprint for ' + user.name + ' this month: ' + footprint.toFixed(2) + ' kg';
    displaySuggestions(footprint, suggestionsDiv);

    var chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Month');
    chartData.addColumn('number', 'CO2 (kg)');
    chartData.addRows(user.monthlyCarbonFootprint.map(function(footprint, index) {
        return ['Month ' + (index + 1), footprint];
    }));

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(chartData, {'title': 'Carbon Footprint Over Time', 'legend': 'none'});

    displayAwards();
}

function calculateFootprint() {
    var digital = Number(document.getElementById('digital-transactions').value) || 0;
    var atm = Number(document.getElementById('atm-transactions').value) || 0;
    var branch = Number(document.getElementById('branch-visits').value) || 0;
    var footprint = calculate(digital, atm, branch);
    customResultDiv.innerText = 'Your calculated carbon footprint: ' + footprint.toFixed(2) + ' kg';
    displaySuggestions(footprint, customSuggestionsDiv);
}

function displaySuggestions(footprint, container) {
    var suggestions = [
        'You can reduce your carbon footprint by doing more digital transactions instead of ATM transactions or branch visits.',
        'Try to reduce the number of ATM transactions you make each month.',
        'Reduce the number of branch visits by taking advantage of online banking services.'
    ];

    var suggestionList = document.createElement('ul');
    suggestions.forEach(function(suggestion) {
        var listItem = document.createElement('li');
        listItem.innerText = suggestion;
        suggestionList.appendChild(listItem);
    });

    container.innerHTML = '';
    container.appendChild(suggestionList);
}

function displayAwards() {
    var footprints = userIds.map(function(userId) {
        return {
            'userId': userId,
            'footprint': data[userId].monthlyCarbonFootprint[data[userId].monthlyCarbonFootprint.length - 1]
        };
    });

    footprints.sort(function(a, b) {
        return a.footprint - b.footprint;
    });

    var rank = footprints.findIndex(function(footprint) {
        return footprint.userId === selectedUserId;
    }) + 1;

    awardsDiv.innerText = 'You are currently ranked ' + rank + '/' + userIds.length + ' in our eco-friendly customer leaderboard!';
}
