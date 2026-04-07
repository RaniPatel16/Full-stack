const fs = require('fs');
const path = require('path');

const states = [
  'MAHARASHTRA', 'GUJARAT', 'TAMIL NADU', 'KARNATAKA', 'UTTAR PRADESH', 
  'DELHI', 'WEST BENGAL', 'KERALA', 'RAJASTHAN', 'TELANGANA',
  'ANDHRA PRADESH', 'MADHYA PRADESH', 'BIHAR', 'PUNJAB', 'HARYANA',
  'ASSAM', 'ODISHA', 'JHARKHAND', 'CHHATTISGARH', 'UTTARAKHAND',
  'HIMACHAL PRADESH', 'TRIPURA', 'MEGHALAYA', 'NAGALAND', 'GOA'
];

const officeTypes = ['B.O', 'S.O', 'H.O', 'G.P.O', 'Sub Post Office'];
const statuses = ['Delivery', 'Delivery', 'Delivery', 'Delivery', 'Non-Delivery']; // 80% delivery
const regions = ['HQ Region', 'City Region', 'Rural Region', 'North Region', 'South Region', 'East Region', 'West Region'];

// Start CSV string
let csv = "Office Name,PIN Code,Office Type,Delivery Status,Division,Region,Circle,Taluk,District,State\n";

console.log("Generating MASSIVE synthetic dataset...");

let rowCount = 0;
// We target roughly 150,000 records total.
for (let stateIdx = 0; stateIdx < states.length; stateIdx++) {
  const state = states[stateIdx];
  const numDistricts = Math.floor(Math.random() * 8) + 15; // 15 to 22 districts per state
  
  for (let distIdx = 1; distIdx <= numDistricts; distIdx++) {
    const districtName = `${state.substring(0,4)} DIST ${distIdx}`;
    const numTaluks = Math.floor(Math.random() * 5) + 6; // 6 to 10 taluks
    
    for (let t = 1; t <= numTaluks; t++) {
      const talukName = `Taluk ${t}`;
      const numOffices = Math.floor(Math.random() * 20) + 25; // 25 to 44 offices per taluk
      
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
