
// document.addEventListener("DOMContentLoaded", function() {
    function getTime(){
        let today = new Date();
        hours = today.getHours();
        minutes = today.getMinutes();
        if(hours<10){
            hours = "0"+hours;
        }
        if(minutes<10){
            minutes = "0"+minutes;
        }
    
        let time = hours + ":" + minutes;
        return time;
    }
    
    
        let score;
        function firstBotMessage() {
            let firstMessage = "Choose one:";
            document.getElementById("botStarterMessage").innerHTML =
              '<p class="botText"><span>' +
              firstMessage +
              '</span></p><div><button id="btnScore0" class="userButton" onclick="handleScore0Click()">List rows with score 0</button><button id="btnScore1" class="userButton" onclick="handleScore1Click()">List rows with score 1</button><button id="btnListAll" class="userButton" onclick="handleListAllClick()">List all</button></div>';
            let time = getTime();
            document.getElementById("chat-timestamp").append(time);
            // document.getElementById("userInput").scrollIntoView(false);
          }



const csvFilePath = 'data.csv';


async function getCSV(csvFilePath) {
    try {
      const response = await fetch(csvFilePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
      }
  
      const csvText = await response.text();
      if (csvText) {
        const data = parseCSV(csvText);
        const portion = data.slice(0, 2);
        console.log(portion);
        return csvText; // Return the raw CSV text
      }
    } catch (error) {
      console.error(`Error fetching CSV: ${error.message}`);
      throw error;
    }
  }
  
  
  
  
  



function parseCSV(csvText) {
  
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    const obj = {};

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = line[j];
    }
    
    data.push(obj);
  }

  return data;
}

function showColumnSelection() {
  getCSV(csvFilePath).then(csvData => {
    let data = csvData 
    console.log("data is:" + data);
    const columnNames = data.split('\n')[0];
    const columnSelectionContainer = document.getElementById('columnSelectionContainer');

   
    const cn = columnNames.split(',');

    cn.forEach(cni => {
      const button = document.createElement('button');
      button.textContent = cni;
      button.classList.add('column-button'); 
      button.dataset.selected = 'false'; 

      button.addEventListener('click', () => {
        
        if (button.dataset.selected === 'true') {
          button.dataset.selected = 'false';
          button.classList.remove('selected'); 
        } else {
          button.dataset.selected = 'true';
          button.classList.add('selected');
        }
      });

      columnSelectionContainer.appendChild(button);
    });

  
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.onclick = filterAndDisplayResults;
    columnSelectionContainer.appendChild(doneButton);
  })
  .catch(error => {
   console.log(error);
  });
}


  function filterAndDisplayResults() {
    
    const selectedColumnNames = [];
  
    const selectedButtons = document.querySelectorAll('.column-button[data-selected="true"]');
  
   
    selectedButtons.forEach(button => {
      const columnName = button.textContent;
      selectedColumnNames.push(columnName);
    });
  
    
    console.log('Selected column names:', selectedColumnNames);
    getCSV(csvFilePath)
.then(
    data=>{
   
    csvDataDisplay(data,x,selectedColumnNames)}
);
    
  
  }
  






        
    firstBotMessage();
    let x = 0;



function promptcol(){
    showColumnSelection();
}

function handleScore0Click() {
  x = 0;
  promptcol();
  displayInformation("Loading information for Score 0...");
}

function handleScore1Click() {
  x = 1;
  promptcol();
  displayInformation("Loading information for Score 1...");
}

function handleListAllClick() {
  x = 2;
  promptcol();
  displayInformation("Loading all information...");
}

function displayInformation(message) {
  const infoDisplay = document.getElementById("info-display");
  infoDisplay.innerHTML = `<p>${message}</p>`;
  infoDisplay.style.display = "block"; // Set it to block
  // You can add more content to the infoDisplay as needed based on your requirements
}
const contentElement = document.querySelector('.content');
contentElement.classList.add('expanded-content');






//   });
function csvDataDisplay(parsedData,score,arr){
  const table = document.getElementById("selected-content");
      table.innerHTML = "";
          const lines = parsedData.split("\n");
          
          if (lines.length > 0) {
              const headers = lines[0].split(",");
              const headerRow = document.createElement("tr");
              headers.forEach(headerText => {
                  if(arr.includes(headerText)){
                  const th = document.createElement("th");
                  th.textContent = headerText;
                  headerRow.appendChild(th);
              }});
              table.appendChild(headerRow);

              for (let i = 1; i < lines.length; i++) {
                  const rowData = lines[i].split(",");
                  if(rowData[7]==score){
                  if (rowData.length === headers.length) {
                      const row = document.createElement("tr");
                      for(let z=0;z<rowData.length;z++){
                          if(arr.includes(headers[z])){
                          const cell = document.createElement("td");
                          if(z==4){
                              const image = document.createElement("img");
                              image.src = rowData[4]; 
                              image.alt = "Description of the image";
                              cell.appendChild(image);
                          }
                          else{
                              cell.textContent = rowData[z];
                              
                          }
                          row.appendChild(cell);
                          
                      }};
                      table.appendChild(row);
                      }


                      
                  }  
                  if(score == 2){
                      if (rowData.length === headers.length) {
                          const row = document.createElement("tr");
                          for(let z=0;z<rowData.length;z++){
                            if(arr.includes(headers[z])){
                            const cell = document.createElement("td");
                            if(z==4){
                                const image = document.createElement("img");
                                image.src = rowData[4]; 
                                image.alt = "Description of the image";
                                cell.appendChild(image);
                            }
                            else{
                                cell.textContent = rowData[z];
                                
                            }
                            row.appendChild(cell);
                            
                        }};
                          table.appendChild(row);
                      }
                  } 
              }
          }
}

