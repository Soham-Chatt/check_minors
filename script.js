fetch('./minors.json')
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById('minorSelect');
    Object.keys(data).sort().forEach((key, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = key;
      select.appendChild(option);
    });
  });

function checkEligibility() {
  const select = document.getElementById('minorSelect');
  const selectedMinor = select.options[select.selectedIndex].textContent;
  fetch('minors.json')
    .then(response => response.json())
    .then(data => {
      const resultText = data[selectedMinor].eligible ? `You can take ${selectedMinor}.` : `You cannot take ${selectedMinor}.`;
      const resultDiv = document.getElementById('result');
      resultDiv.textContent = resultText;
      resultDiv.className = data[selectedMinor].eligible ? 'text-success' : 'text-danger';
    });
}

let tableVisible = false; // Track visibility
function showEligibleMinors() {
  const eligibleDiv = document.getElementById('eligibleMinors');
  const toggleButton = document.querySelector('button.btn-secondary');

  if (!tableVisible) {
    fetch('./minors.json')
      .then(response => response.json())
      .then(data => {
        let tableHtml = '<table class="table table-dark table-striped"><thead><tr><th>Eligible Minors</th></tr></thead><tbody>';
        Object.entries(data).forEach(([minor, details]) => {
          if (details.eligible) {
            tableHtml += `<tr><td>${minor}</td></tr>`;
          }
        });
        tableHtml += '</tbody></table>';
        eligibleDiv.innerHTML = tableHtml;
        toggleButton.textContent = 'Hide Eligible Minors';
      });
  } else {
    eligibleDiv.innerHTML = '';
    toggleButton.textContent = 'Show All Eligible Minors';
  }

  tableVisible = !tableVisible;
}
