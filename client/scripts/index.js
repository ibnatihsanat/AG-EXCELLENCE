function calculate() {
    var area = parseFloat(document.getElementById('area').value);
    var yield = parseFloat(document.getElementById('yield').value);

    var productivityRate = 0.1;

    var yieldPerHectare = yield / area;

    var workersNeeded = Math.ceil(yield / (area * productivityRate));

    var result = document.getElementById('result');
    result.innerHTML = `Yield per hectare: ${yieldPerHectare.toFixed(2)} tons/hectare <br> Number of workers needed: ${workersNeeded}`;
}
