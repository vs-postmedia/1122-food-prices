import CloudTablesApi from 'cloudtables-api';
import Combobox from './Components/Combobox/Combobox.js';
import agenciesList from './data/agencies.js';
import params from './data/params.js';

// CSS
import normalize from './css/normalize.css';
import postmedia from './css/postmedia.css';
import colours from './css/colors.css';
import fonts from './css/fonts.css';
import css from './css/main.css';
import cloudtable from'./css/cloudtable.css';

// FONTS
import'./fonts/Shift-Bold.otf';
import'./fonts/Shift-BoldItalic.otf';
import'./fonts/BentonSansCond-Regular.otf';
import'./fonts/BentonSansCond-RegItalic.otf';
import'./fonts/BentonSansCond-Bold.otf';


// VARS
let server;
let serverPool;


// JS FUNCTIONS
const init = async () => {
    // assign server - HACK!!! DISABLE WHEN TRAFFIC DROPS
    // serverPool = params.serverPool;
    // server = await assignServer(serverPool);

    server = params.cloudTableDomain;

    // create dynamic list of options for agency select tag
    createAgencyComboBox(agenciesList);

    // create combobox filter for agencies
    Combobox('#combobox');
    $('#combobox').change(comboboxChangeHandler);

    // load the unfiltered cloudtable
    loadCloudTable('');
};

// super-hack "load balancer"
function assignServer(serverPool) {
    let server;
    // const date = new Date();
    // const current_min = date.getMinutes();

    // if (current_min % 2 == 0) {
    //     server = params.cloudTableDomain;
    // } else {
    //     server = params.cloudTableDomain_v2;
    // }
    if (serverPool.length == 0) {
        // re-assign server pool & pull sever from pool
    } else {
        // pull server from pool
        server = serverPool.pop();
    }

    // return server
    return server;
}

function comboboxChangeHandler(e) {
    // reset container dom element
    $('.cloudtables')[0].textContent = '';

    // reload the table with selected agency filtered
    const filterValue = e.target.value === 'All agencies' ? null : e.target.value;

    // reload table
    loadCloudTable(filterValue);
}

function createAgencyComboBox(agenciesList) {
    let agenciesString = '';

    // sort our list
    const list = agenciesList.sort();
    list.unshift('All agencies');

    list.forEach(d => {
        agenciesString += `<option value='${d}'>${d}</option>`;
    });
    
    $('#combobox').append(agenciesString);
}

async function loadCloudTable(agency) {
    let conditionsArray = [
        {
            id: params.agencyId, 
            value: agency
        }
    ];

    // if the filter has been selected, filter for those options, otherwise show everything (null)
    let conditions = agency ? conditionsArray : null;

    // grab the ct api instance
    let api = new CloudTablesApi(params.apiKey, {
        clientName: params.clientId,     // Client's name - optional
        domain: server,                 // CloudTables host
        // domain: params.cloudTableDomain,       // Your CloudTables host
        // secure: false,              // Disallow (true), or allow (false) self-signed certificates   
        // ssl: false,               // Disable https
        conditions: conditions      // Use this to filter table
    });


    console.log(`https://${server}/io/loader/${params.cloudTableId}/table/d`)
    // get a cloudtables api token
    let token = await api.token();
    // build the script tag for the table
    let script = document.createElement('script');
    script.src = `https://${server}/io/loader/${params.cloudTableId}/table/d`;
    script.setAttribute('data-token', token);
    script.setAttribute('data-insert', params.tableId);
    script.setAttribute('data-clientId', params.clientId);

    // insert the script tag to load the table
    let app = document.getElementById(params.appId).appendChild(script);
}

// KICK *SHT OFF!!!
init();