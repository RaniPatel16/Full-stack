const fs = require('fs');
const path = require('path');

const states = [
  'MAHARASHTRA', 'GUJARAT', 'TAMIL NADU', 'KARNATAKA', 'UTTAR PRADESH', 
  'DELHI', 'WEST BENGAL', 'KERALA', 'RAJASTHAN', 'TELANGANA',
  'ANDHRA PRADESH', 'MADHYA PRADESH', 'BIHAR', 'PUNJAB', 'HARYANA'
];

const officeTypes = ['B.O', 'S.O', 'H.O'];
const statuses = ['Delivery', 'Delivery', 'Delivery', 'Non-Delivery']; // 75% delivery
const regions = ['HQ Region', 'City Region', 'Rural Region', 'North Region', 'South Region'];

// Start CSV string
let csv = "Office Name,PIN Code,Office Type,Delivery Status,Division,Region,Circle,Taluk,District,State\n";

console.log("Generating large synthetic dataset...");

let rowCount = 0;
for (let stateIdx = 0; stateIdx < states.length; stateIdx++) {
  const state = states[stateIdx];
  const numDistricts = Math.floor(Math.random() * 5) + 5; // 5 to 9 districts per state
  
  for (let distIdx = 1; distIdx <= numDistricts; distIdx++) {
    const districtName = `${state.substring(0,4)} DIST ${distIdx}`;
    const numTaluks = Math.floor(Math.random() * 4) + 3; // 3 to 6 taluks
    
    for (let t = 1; t <= numTaluks; t++) {
      const talukName = `Taluk ${t}`;
      const numOffices = Math.floor(Math.random() * 15) + 10; // 10 to 24 offices per taluk
      
      for (let o = 1; o <= numOffices; o++) {
        // Base pin code logic
        const basePin = (stateIdx + 1) * 100000 + (distIdx * 1000) + (t * 10) + o;
        const pinCode = basePin.toString().padStart(6, '0');
        
        const officeName = `Office ${pinCode} ${districtName}`;
        const officeType = officeTypes[Math.floor(Math.random() * officeTypes.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const region = regions[Math.floor(Math.random() * regions.length)];
        
        csv += `"${officeName}","${pinCode}","${officeType}","${status}","${districtName} Div","${region}","${state} Circle","${talukName}","${districtName}","${state}"\n`;
        rowCount++;
      }
    }
  }
}

fs.writeFileSync(path.join(__dirname, '../pincodes_all.csv'), csv);
console.log(`Successfully generated ${rowCount} PIN codes directly into pincodes_all.csv!`);
