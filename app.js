//Logs a message in the console of your website
console.log("Hello B2S");

//1. Grab the container from the index page.
const containerDiv = document.getElementById("vizContainer");
console.log(containerDiv);

//2. Define some viz options (device, width, height).
const options = {
  device: "desktop",
  hideToolbar: false,
  height: 1000,
  width: 1000,
};

//3. Create a variable to hold the dashboard URL
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

//Defining the variable viz
let viz;

// Create variable for the PDF Button
const pdfButton = document.getElementById("exportPDF");
// Create variable for the PowerPoint Button
const ppButton = document.getElementById("exportPP");

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

// Export PDF
pdfButton.addEventListener("click", function () {
  viz.showExportPDFDialog();
});

// Export PowerPoint
ppButton.addEventListener("click", function () {
  viz.showExportPowerPointDialog();
});

// Function that grabs the filter values and filters the viz
function getRangeValues() {
  //get the values from the input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  //get the workbook
  const workbook = viz.getWorkbook();
  //active sheet, either a dashboard or a worksheet.
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("You filtered the viz!"));
}

document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValues);

document.addEventListener("DOMContentLoaded", initViz);
